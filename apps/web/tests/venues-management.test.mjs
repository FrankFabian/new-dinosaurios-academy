import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

async function loadAcademicsApi({ fetchImpl }) {
  const source = await readFile("src/features/venues/api.ts", "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const exports = {};
  const context = vm.createContext({
    FormData,
    Response,
    fetch: fetchImpl,
    process: {
      env: {
        BACKEND_URL: "http://backend.test",
      },
    },
    require,
    exports,
  });

  context.module = { exports };
  new vm.Script(outputText).runInContext(context);

  return context.module.exports;
}

test("academics API client loads every manageable structure resource through the configured backend", async () => {
  const requests = [];
  const { getAcademyStructure } = await loadAcademicsApi({
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options });

      return new Response(JSON.stringify({ results: [] }), { status: 200 });
    },
  });

  await getAcademyStructure("csrftoken=csrf-token; sessionid=session-key");

  assert.deepEqual(
    requests.map((request) => request.url),
    [
      "http://backend.test/api/academics/venues/",
      "http://backend.test/api/academics/courts/",
      "http://backend.test/api/academics/disciplines/",
      "http://backend.test/api/academics/categories/",
    ],
  );
  assert.equal(requests[0].options.credentials, "include");
});

test("academics API client supports create, edit, and deactivate calls with CSRF credentials", async () => {
  const requests = [];
  const { createAcademyResource, updateAcademyResource, deactivateAcademyResource } = await loadAcademicsApi({
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options });

      return new Response(JSON.stringify({ id: 7, name: "Sede Surco", status: "active" }), { status: 200 });
    },
  });

  await createAcademyResource("venues", { name: "Sede Surco" }, "cookies", "csrf-token");
  await updateAcademyResource("venues", 7, { name: "Sede Surco renovada" }, "cookies", "csrf-token");
  await deactivateAcademyResource("venues", 7, "cookies", "csrf-token");

  assert.equal(requests[0].url, "http://backend.test/api/academics/venues/");
  assert.equal(requests[0].options.method, "POST");
  assert.equal(requests[1].url, "http://backend.test/api/academics/venues/7/");
  assert.equal(requests[1].options.method, "PATCH");
  assert.equal(requests[2].url, "http://backend.test/api/academics/venues/7/");
  assert.equal(requests[2].options.method, "DELETE");
  assert.equal(requests[0].options.headers["X-CSRFToken"], "csrf-token");
  assert.equal(requests[0].options.credentials, "include");
});

test("venues management page uses translated labels for CRUD, validation, permissions, and every resource", async () => {
  const [page, management, shared, venueColumns, categoryColumns, messages] = await Promise.all([
    readFile("src/app/structure/page.tsx", "utf8"),
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/features/venues/components/academic-table-shared.tsx", "utf8"),
    readFile("src/features/venues/components/venues-columns.tsx", "utf8"),
    readFile("src/features/venues/components/categories-columns.tsx", "utf8"),
    readFile("src/lib/i18n/messages.ts", "utf8"),
  ]);

  assert.match(messages, /academics:/);
  assert.match(messages, /venues:/);
  assert.match(messages, /courts:/);
  assert.match(messages, /disciplines:/);
  assert.match(messages, /categories:/);
  assert.match(messages, /createAction:/);
  assert.match(messages, /editTitle:/);
  assert.match(messages, /editAction:/);
  assert.match(messages, /deactivateAction:/);
  assert.match(messages, /reactivateAction:/);
  assert.match(messages, /toasts:/);
  assert.match(messages, /emptyStates:/);
  assert.match(messages, /validation:/);
  assert.match(messages, /permissionDenied:/);
  assert.match(messages, /mapAction:/);
  assert.match(page, /AppShell/);
  assert.match(page, /activeKey="venues"/);
  assert.match(page, /VenuesManagementPage/);
  assert.match(management, /activeSection = "venues"/);
  assert.match(page, /const messages = allMessages\.academics/);
  assert.match(management, /createAcademyResourceAction/);
  assert.match(management, /updateAcademyResourceAction/);
  assert.match(management, /deactivateAcademyResourceAction/);
  assert.match(shared, /messages\.reactivateAction/);
  assert.match(venueColumns, /MapPinned/);
  assert.match(management, /messages\.resources\.venues/);
  assert.match(management, /messages\.resources\.courts/);
  assert.match(management, /messages\.resources\.disciplines/);
  assert.match(management, /messages\.resources\.categories/);
  assert.match(categoryColumns, /row\.original\.code/);
  assert.match(management, /messages\.emptyStates\.venues/);
  assert.match(management, /messages\.emptyStates\.courtsWithoutVenues/);
  assert.match(management, /messages\.emptyStates\.courts/);
  assert.match(management, /messages\.emptyStates\.disciplines/);
  assert.match(management, /messages\.emptyStates\.categories/);
  assert.match(page, /messages\.permissionDenied/);
});

test("venues management keeps creation scoped to the active section", async () => {
  const management = await readFile("src/features/venues/venues-management-page.tsx", "utf8");

  assert.match(management, /href=\{`\/structure\?section=\$\{resource\}&create=\$\{resource\}`\}/);
  assert.match(management, /<Button asChild className="gap-2" size="sm">/);
  assert.doesNotMatch(management, /bg-\[oklch\(45%_0\.08_155\)\]/);
  assert.match(management, /EmptyState[\s\S]*resource=\{resource\}/);
});

test("venues management edits rows inline with compact actions", async () => {
  const [management, table, shared] = await Promise.all([
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/features/venues/components/academic-resource-table.tsx", "utf8"),
    readFile("src/features/venues/components/academic-table-shared.tsx", "utf8"),
  ]);

  assert.match(table, /InlineEditPanel/);
  assert.match(shared, /RowActions/);
  assert.match(shared, /DropdownMenu/);
  assert.match(shared, /MoreHorizontal/);
  assert.match(shared, /const deactivateMutation = useMutation/);
  assert.match(shared, /const reactivateMutation = useMutation/);
  assert.match(shared, /deactivateMutation\.mutate\(\)/);
  assert.match(shared, /reactivateMutation\.mutate\(\)/);
  assert.doesNotMatch(shared, /<form action=\{deactivateAction\}/);
  assert.doesNotMatch(shared, /<form action=\{updateAction\}/);
  assert.match(table, /editingKey !== `\$\{resource\}:\$\{row\.original\.id\}`/);
  assert.match(shared, /messages\.cancelAction/);
});

test("venues management separates filters from sortable tables without sorting status or showing manual order columns", async () => {
  const [management, dataTable, venueColumns, courtColumns, disciplineColumns, categoryColumns, packageJson] = await Promise.all([
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/components/organisms/data-table.tsx", "utf8"),
    readFile("src/features/venues/components/venues-columns.tsx", "utf8"),
    readFile("src/features/venues/components/courts-columns.tsx", "utf8"),
    readFile("src/features/venues/components/disciplines-columns.tsx", "utf8"),
    readFile("src/features/venues/components/categories-columns.tsx", "utf8"),
    readFile("package.json", "utf8"),
  ]);
  const columns = [venueColumns, courtColumns, disciplineColumns, categoryColumns].join("\n");

  assert.match(packageJson, /@radix-ui\/react-dropdown-menu/);
  assert.match(packageJson, /@tanstack\/react-table/);
  assert.match(dataTable, /useReactTable/);
  assert.match(dataTable, /getSortedRowModel/);
  assert.match(dataTable, /TableHeader/);
  assert.match(dataTable, /TableBody/);
  assert.match(dataTable, /TableCell/);
  assert.match(management, /<section className="grid gap-4" id=\{resource\}>/);
  assert.match(management, /className="rounded-lg border border-border bg-surface px-4 py-4"/);
  assert.match(management, /AcademicResourceTable/);
  assert.doesNotMatch(management, /<table/);
  assert.match(columns, /enableSorting: false/);
  assert.doesNotMatch(columns, /sort: "status"/);
  assert.doesNotMatch(management, /px-4 pb-4 pt-4/);
  assert.doesNotMatch(management, /px-4 py-8/);
});

test("venues management distinguishes filtered empty results from create-empty states", async () => {
  const [management, messages] = await Promise.all([
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/lib/i18n/messages.ts", "utf8"),
  ]);

  assert.match(management, /FilteredEmptyState/);
  assert.match(management, /scopedRows\.length > 0/);
  assert.match(management, /messages\.filteredEmpty/);
  assert.match(messages, /filteredEmpty/);
  assert.match(management, /href=\{`\/structure\?section=\$\{resource\}&status=all`\}/);
});

test("venues management keeps create and edit form controls consistent", async () => {
  const [formConfig, shared, client] = await Promise.all([
    readFile("src/features/venues/components/academic-resource-form-config.ts", "utf8"),
    readFile("src/features/venues/components/academic-table-shared.tsx", "utf8"),
    readFile("src/features/venues/academics-management-client.tsx", "utf8"),
  ]);

  assert.match(formConfig, /\{ label: fieldLabels\.name, name: "name", required: true \},\s*\{ disabled: Boolean\(row\), label: fieldLabels\.slug, name: "slug", required: true, validation: "slug" \}/);
  assert.doesNotMatch(formConfig, /name: "sort_order"/);
  assert.doesNotMatch(client, /formData\.set\("sort_order"/);
  assert.match(shared, /InlineEditPanel/);
  assert.match(shared, /resourceMessages\.editTitle/);
  assert.doesNotMatch(shared, /<h3 className="text-base font-semibold">\{messages\.editAction\}<\/h3>/);
  assert.match(shared, /defaultValuesForResource\(resource, row\)/);
  assert.match(shared, /cancelHref=\{`\/structure\?section=\$\{resource\}`\}/);
  assert.match(client, /cancelHref/);
  assert.match(client, /requireDirty/);
  assert.match(client, /form\.formState\.isDirty/);
  assert.match(client, /superRefine/);
  assert.match(client, /minAge > maxAge/);
  assert.match(client, /messages\.ageRange/);
  assert.match(client, /validation === "age"/);
  assert.match(client, /validation === "categoryCode"/);
  assert.match(formConfig, /validation: "age"/);
  assert.match(formConfig, /validation: "categoryCode"/);
  assert.match(client, /onSuccess: \(_result, values\) =>/);
  assert.match(client, /form\.reset\(values\)/);
  assert.match(client, /if \(cancelHref\) \{/);
  assert.match(client, /router\.replace\(cancelHref\)/);
  assert.match(client, /VenueFilterSelect/);
});

test("venues route delegates management UI to the feature component", async () => {
  const page = await readFile("src/app/structure/page.tsx", "utf8");

  assert.match(page, /VenuesManagementPage/);
  assert.doesNotMatch(page, /function ActiveSection/);
  assert.doesNotMatch(page, /<table/);
});

test("academy structure surface uses /structure instead of exposing /venues as a route", async () => {
  const [navigation, actions, management, shared] = await Promise.all([
    readFile("src/lib/auth/navigation.ts", "utf8"),
    readFile("src/features/venues/actions.ts", "utf8"),
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/features/venues/components/academic-table-shared.tsx", "utf8"),
  ]);

  assert.match(navigation, /href: "\/structure"/);
  assert.match(actions, /revalidatePath\("\/structure"\)/);
  assert.match(management, /href=\{`\/structure\?section=\$\{key\}`\}/);
  assert.match(shared, /href=\{`\/structure\?section=\$\{resource\}&editing=\$\{resource\}:\$\{id\}`\}/);
  assert.doesNotMatch(navigation, /href: "\/venues"/);
  assert.doesNotMatch(actions, /revalidatePath\("\/venues"\)/);
  assert.doesNotMatch(management, /`\/venues\?/);
  assert.doesNotMatch(shared, /`\/venues\?/);
});

test("design system documents operational form consistency rules", async () => {
  const [agents, architecture, design] = await Promise.all([
    readFile("../../AGENTS.md", "utf8"),
    readFile("../../docs/technical-architecture.md", "utf8"),
    readFile("../../DESIGN.md", "utf8"),
  ]);

  assert.match(design, /Operational Form Consistency Rule/);
  assert.match(design, /Redundancy And Verification Rule/);
  assert.match(design, /Use Zod with React Hook Form/);
  assert.match(design, /shadcn Component Standard/);
  assert.match(design, /Toast Standard/);
  assert.match(design, /Court Green 2B/);
  assert.match(design, /oklch\(45% 0\.12 158\)/);
  assert.match(design, /TanStack Table/);
  assert.match(design, /single visible create action/i);
  assert.match(design, /same field order/i);
  assert.match(design, /row actions must stay aligned/i);
  assert.match(design, /filters and tables should be visually separated/i);
  assert.match(architecture, /TanStack Table plus shadcn Table/);
  assert.match(architecture, /inline errors before submit/);
  assert.match(architecture, /sonner/);
  assert.match(architecture, /A frontend change is not complete until the relevant automated tests pass/);
  assert.match(architecture, /features\/\*\/components\/\*-columns\.tsx/);
  assert.match(agents, /Use TanStack Table with shadcn Table/);
  assert.match(agents, /Use shadcn\/ui primitives/);
  assert.match(agents, /cross-field validations in Zod/);
  assert.match(agents, /Use `sonner`/);
  assert.match(agents, /Court Green 2B/);
  assert.match(agents, /Before reporting work as done, run the relevant tests/);
  assert.match(agents, /misleading empty states/);
});

test("venues management implementation is prepared for React Query and RHF Zod forms", async () => {
  const [packageJson, page, management, table, client, sonner, button, shared] = await Promise.all([
    readFile("package.json", "utf8"),
    readFile("src/app/structure/page.tsx", "utf8"),
    readFile("src/features/venues/venues-management-page.tsx", "utf8"),
    readFile("src/components/ui/table.tsx", "utf8"),
    readFile("src/features/venues/academics-management-client.tsx", "utf8"),
    readFile("src/components/ui/sonner.tsx", "utf8"),
    readFile("src/components/ui/button.tsx", "utf8"),
    readFile("src/features/venues/components/academic-table-shared.tsx", "utf8"),
  ]);

  assert.match(packageJson, /@tanstack\/react-query/);
  assert.match(packageJson, /@tanstack\/react-table/);
  assert.match(packageJson, /sonner/);
  assert.match(packageJson, /react-hook-form/);
  assert.match(packageJson, /@hookform\/resolvers/);
  assert.match(page, /AcademicsManagementClient/);
  assert.match(management, /AcademyResourceForm/);
  assert.match(client, /useMutation/);
  assert.match(client, /zodResolver/);
  assert.match(client, /form\.formState\.errors\[field\.name\]\?\.message/);
  assert.match(shared, /useMutation/);
  assert.match(client, /toast\.success\(successMessage\)/);
  assert.match(shared, /toast\.success\(messages\.toasts\.deactivateSuccess\)/);
  assert.match(shared, /toast\.success\(messages\.toasts\.reactivateSuccess\)/);
  assert.match(shared, /successMessage=\{messages\.toasts\.updateSuccess\}/);
  assert.match(sonner, /Toaster as Sonner/);
  assert.match(table, /function Table/);
  assert.match(client, /Input/);
  assert.match(client, /Label/);
  assert.match(button, /oklch\(45%_0\.12_158\)/);
  assert.match(button, /oklch\(52%_0\.135_158\)/);
});
