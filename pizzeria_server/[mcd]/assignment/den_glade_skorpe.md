<div style="text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column; height: 30vh">

# FAGPRØVE

## Oktober 2024

### Webudvikler-uddannelsen<br>Medieskolerne / Media College Denmark

</div>

<div style="page-break-after: always;"></div>

```

Project : Den Glade Skorpe
Description : Kravspecifikation.
```

# Den Glade Skorpe

Et moderne pizzaria med online bestilling

## Indledning

Den Glade Skorpe er et pizzaria der er kendt for saftige pizzaer med sprøde
skorper. De har fået lavet et design til deres hjemmeside, og vil nu gerne have
den udviklet, så de kan få flere kunder.

De ønsker at applikationen også fungerer som et backoffice til dem selv, så de
bl.a. kan tilføje/opdatere/slette medarbejdere i restauranten. De ønsker at
webshoppen på sigt skal være skalérbar. Men til at starte med er mobiludgaven
den vigtigste for dem, da de mener at de fleste af deres fremtidige kunder
benytter deres mobil til at bestille fra.

## Obligatoriske Opgaver.

1. Mobile first frontend i forhold til figma.
2. Forside
   - Alle retter
   - Filtreringsfunktion
3. Enkelt visning/detaljeside (dish)
   - Valg af evt. størrelse
   - Tilføj retten til kurven (localeStorage)
4. Personalet
   - Visning af personalet
5. Kontakt
   - Formular med validering der sender navn, emne og beskrivelse til serveren.
6. Kurv
   - Vis de bestillinger du har lagt i kurven via locale storage
7. Backoffice (Ikke mobil krav).
   - Employees
     - Post, Put, Delete

## Minimum 1 Tilvalg

1. Responsive breakpoint > 1024px.
2. Tilføjelse af ekstra ingredienser på detaljesiden
   - Eksempel på design er medtaget i Figma-filen
   - Der må her gerne ændres i designet, for at vise andre løsninger.
3. Backoffice
   - Messages (Vis de beskeder der er sendt via kontaktformularen)
     - Read/unread
4. Backoffice
   - Dishes
     - Post, Put, Delete
5. Afgiv ordrer via serveren
   - Post bestillingerne fra kurven til serveren.
6. Authentication
   - Slå auth til på server
   - Sign In

## Navigations Diagram

![alt text](_den_glade_skorpe.png "Title")

Du skal ikke følge denne slavisk men den er tilføjet for at illustrere
hensigten.

## Obligatoriske sider

1. "/"
2. "/dish/:id"
3. "/employees"
4. "/contact"
5. "/basket"
6. "/backoffice"
7. "/backoffice/employees"

## Tilvalgs Sider

1. "/backoffice/dishes"
2. "/backoffice/messages"
3. "/backoffice/orders"

## Design Noter

**Design**

De skal følge dette Figma-design:

- https://www.figma.com/design/yzjuDfwFzngz8EySrOXSf6/Den-Glade-Skorpe?node-id=0-1&m=dev&t=hPigMMpU4cnJTE7p-1

**Font**

1. Overskrifter/Knapper

   - Just Another Hand: https://fontsource.org/fonts/just-another-hand

2. Body
   - Kurale: https://fontsource.org/fonts/kurale

## Rapport

**Rapporten skal indeholde:**

- Vurdering af din egen indsats og gennemførelse af prøven.
- Argumentation for de valg du har truffet under løsningen af opgaven.
- Redegørelse for oprindelsen af de forskellige kodeelementer i prøven.
- Beskrivelse af eventuelle særlige punkter til bedømmelse.
- Angivelse af url adresser, brugernavne og passwords der er nødvendige for at
  lærer og censor kan se opgaven. Hvis du bruger et agilt projektstyringsværktøj
  (SCRUM, Trello eller lign.) kan du med fordel indsætte et link til dit projekt
  i rapporten. Vi vil meget gerne se en daglig planlægning og eksekvering.

**På forsiden af rapporten skal fremgå:**

- Opgavens navn samt dit navn og holdnummer (navn - WebH120-2) •
  Brugernavn/adgangskoder

<div style="page-break-after: always;"></div>

## Retningslinjer

**Tidspunkt for udlevering**

Opgaven udleveres mandag d. 21/10 kl. 9.00.

**Tidspunkt for aflevering**

Din aflevering skal være afleveret fredag d. 25/10 kl. 20.00.

**Aflevering skal godkendes**

Din aflevering skal godkendes af din underviser.

**Aflevering skal indeholde**

1. Din kildekode (js, css, html, package.json, osv.), alt hvad du benytter for
   at lave projektet.
2. En instruktion i form af en readme.md, der beskriver hvad der skal til for at
   starte projektet.
3. En rapport. (pdf, eller .md (Mark Down)).

**Afleveringsformat**

1. Du kan aflevere det hele i en samlet zip fil uden ”node_modules”.
2. Du kan aflevere det hele som et GIT repositorie.

Tal med din underviser, og forbered gerne begge dele.

**Mundtlig eksamination**

Under eksaminationen skal du præsentere din opgaveløsning. Derudover skal du
kunne redegøre for enkeltelementer af løsningen - Dette kan være spørgsmål
omkring koder, valg af metodikker, navigationselementer, databaselayout eller
lignende. Udover projektopgaven kan øvrige emner, der relaterer sig til
uddannelsens fagområde indgå i eksaminationen.

**På dagen for eksamen**

På selve eksamensdagen ankommer du til skolen i god tid, før eksaminator og
censor har skuetid på din projektløsning. Projektet afvikles fra din egen
maskine, der bliver forbundet til en større skærm via HDMI (Tjek hjemmefra at
forbindelsen virker). Hvis ikke du medbringer strømforsyning, skal du sørge for
at maskinen er fuldt opladet og at den ikke låser med kode efter få minutter.
Fjern alt fra skrivebordet som er uvæsentlig for eksamen, og klargør programmer
og browser med projektet tændt. Du bliver inviteret ind i eksamenslokalet
kortvarigt for at opsætte din maskine, og skal derefter forlade lokalet under
skuetiden. Ved skuetids ophør bliver du hentet ind i lokalet igen, og skal
begynde din præsentation af projektet. Du har ca. 25 minutters eksamenstid,
hvorefter du skal forlade lokalet, mens eksaminator og censor voterer.
Slutteligt vil du blive kaldt ind i lokalet, og mundtligt få udleveret din
karakter samt en kort forklaring af karakteren. Utilfredshed med karakteren skal
ikke diskuteres ved overdragelsen af karakteren, men kan klargøres i en
skriftlig klage over karakteren eller formen ved eksamen eller karakterens
afgivelse.

**Klager**

Klager i forhold til eksamen modtages indtil 2 uger efter eksamenstidspunktet,
og kun i skriftlig begrundet form.
https://www.retsinformation.dk/eli/lta/2014/41#Kap10

**Vejledning**

Det er tilladt at kontakte undervisere i forbindelse med vejledning.
Undervisere, må ikke, i forbindelse med tvivl eller lign., aflevere løsninger
men må gerne vejlede.
