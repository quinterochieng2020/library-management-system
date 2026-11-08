# library-management-system
## Schema Decisions

### Why Book References Genre via Foreign Key Rather Than Embedding
In this application, the `Book` model references the `Genre` model via a foreign key (`genreId`) using Prisma's `@relation` directive rather than embedding genre data directly into each book record. This design decision is based on core relational database principles:

1. **Data Normalization & Integrity:** Storing genres in a separate table establishes a single source of truth. If a genre's name needs to be updated or corrected (e.g., correcting a typo or renaming a category), it only needs to be updated in one place within the `Genre` table rather than updating thousands of individual book records.
2. **Storage Efficiency & Redundancy Reduction:** Storing duplicate genre name strings across every book record creates unnecessary data duplication. Using a relational foreign key keeps the storage footprint minimal and maintains data consistency across large datasets.
