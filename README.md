# Personal Shopping List App
### ABSTRACT
I keep my shopping list in Notes on my iPhone. But because I shop at two different stores (Meijer and Aldi), I add my items to two separate lists organized by each store's layout.

This minor annoyance let me to creating this app. I'm first going to test my concept using React. If all goes well I'll be porting that to React Native, then recreate everything in SwiftUI.

## Stage 1
### NAVIGATION BUTTONS
- MAKE LIST (default) - where selections are made to the master grocery list 
- SHOP - select which store you're shopping at 
- MODIFY LIST - to add new items or remote items that will no longer be needed in the list

### STATE LIST OBJECT
  
State will be held in one object containing the store sections as the keys (pharmacy, produce, frozen, etc...),  with the regular items I often purchase in each section as the value as an array of objects that will contain the name (string), if it's been selected for this week's groceries (boolean), and a note (string) for anything I need to remind myself about that item.

The user will be able to add or remove items to the list, and add or remove notes to each item.

SECTIONS
- Miscellaneous (always first)
- Bakery
- Breakfast
- Canned & Boxed 
- Dairy
- Drinks
- Ethnic
- Frozen
- Household
- Meat
- Pharmacy
- Produce
- Snacks
### STATE STORE OBJECT
Stores will be presented as an array of section titles in the order each store is layed out. These will be hard coded for now

## Stage 2
### ADD, REMOVE OR MODIFY STORES
The first upgrade to the app will be to allow the user to add, remove or modify the order in which the departments are layed out in the store.

There will be no way to delete all the stores as one default layout will always be available.

