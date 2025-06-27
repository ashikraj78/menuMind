# MenuMind Database Schema

## Table: restaurants
- id: uuid (PK)
- name: text
- ... (other fields)

## Table: menu_items
- id: uuid (PK)
- name: text
- description: text
- price: numeric
- category: text
- is_veg: boolean
- embedding: vector(1536)
- restaurant_id: uuid (FK → restaurants.id)
- ... (other fields)

---

## Migration: Add restaurant_id to menu_items

```sql
ALTER TABLE menu_items
ADD COLUMN restaurant_id uuid REFERENCES restaurants(id);
```

- This column links each menu item to a restaurant.
- Update backend and data import logic to populate this field.
