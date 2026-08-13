# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.0.0] - 2024-10-13

- Order model har fået "comments" omdøbt til "comment" 
- Order model har fået tilføje "shipped". Benyttes til at markere ordren som "færdig" lavet og sendt afsted fra pizza jongløren. Tænker at man kun skal kunne fjerne eller øge/sænke antal på en ordre. 
- Order "PUT", "POST" - "DELETE BY ID"

## [1.0.0] - 2024-10-12

### Changes
- Message model har fået status:Boolean = false 
- Ingredient model har fået fjernet "category". 
- Ingrediens Seed er synkroniseret med dishes
- Category har fuld CRUD
- Ændrer eller sletter man en `Ingrediens` slår det igennem på alle retter
- Ændrer eller sletter man en `Kategori` slår det igennem på alle retter
- Alle puts uden billede overskrive ikke med dummy mere.