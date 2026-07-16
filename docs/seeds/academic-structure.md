# Academic Structure Seed

This seed provides an initial operational dataset for issue #5. It is intentionally manual: run it only when a local or deployment environment should receive the initial venues, courts, and categories.

Command:

```powershell
pnpm --filter backend seed:academics
```

The command is idempotent. It updates records by venue name, court name within venue, and category name.

## Venues

| Name | District | Address | Notes |
| --- | --- | --- | --- |
| Colegio Nuestra Senora de la Merced | Miraflores | Av. Arequipa 4580 | Cancha alquilada para temporada regular. |
| Colegio Santa Maria Marianistas | Santiago de Surco | Av. La Floresta 250 | Sede escolar usada para entrenamientos de fin de semana. |
| Colegio San Agustin | San Isidro | Av. Javier Prado Este 980 | Sede alternativa para temporadas con alta demanda. |

## Courts

| Venue | Court | Notes |
| --- | --- | --- |
| Colegio Nuestra Senora de la Merced | Cancha principal | Uso preferente para basketball. |
| Colegio Nuestra Senora de la Merced | Cancha auxiliar | Disponible para entrenamientos reducidos. |
| Colegio Santa Maria Marianistas | Coliseo principal | Espacio techado para basketball y volleyball. |
| Colegio Santa Maria Marianistas | Cancha exterior | Sujeta a disponibilidad del colegio. |
| Colegio San Agustin | Cancha multiuso | Cancha alquilada para bloques rotativos. |

## Categories

| Name | Code | Age Range | Sort Order |
| --- | --- | --- | --- |
| Sub 8 | U8 | 6-8 | 10 |
| Sub 10 | U10 | 9-10 | 20 |
| Sub 12 | U12 | 11-12 | 30 |
| Sub 14 | U14 | 13-14 | 40 |
| Sub 16 | U16 | 15-16 | 50 |
| Libre | LIBRE | None | 60 |

## Notes

- Disciplines are not duplicated here because basketball and volleyball are already seeded by the academics app setup.
- Category age ranges are suggestions only. Staff can override the suggested category later through enrollment workflows.
- Courts are not discipline-specific in issue #5. Venue-discipline availability remains a future scheduling/configuration concern.
