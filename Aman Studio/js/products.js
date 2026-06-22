/* =========================================================
   AMAN STUDIO — PRODUCT CATALOG
   =========================================================
   This is the file you'll edit most often.

   To add a product: copy a block below, give it a unique id,
   and fill in the fields. To remove one, delete its block.

   FIELDS:
   id     - unique string, no spaces (e.g. 'p10')
   name   - product name shown on the card 
   cat    - must exactly match one of the CATEGORIES below
   price  - selling price in rupees (number, no commas/symbols)
   mrp    - original price to show as struck-through, or null
   img    - image URL (or a local path like 'assets/pot1.jpg')
   seal   - small badge text on the product image, e.g. 'Handmade'
   ========================================================= */

const PRODUCTS = [
  { id: 'p1', name: 'Hand-thrown Water Matka', cat: 'Kitchen & Dining', price: 1450, mrp: 1800, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80', seal: 'Best Seller' },
  { id: 'p2', name: 'Carved Terracotta Wall Plate', cat: 'Home & Decor', price: 1100, mrp: null, img: 'https://images.unsplash.com/photo-1610701596061-cf3a8c620a9c?w=600&q=80', seal: 'Handmade' },
  { id: 'p3', name: 'Diya Set of 11', cat: 'Festive', price: 399, mrp: 499, img: 'https://images.unsplash.com/photo-1604423043492-7d3b3bdaa68a?w=600&q=80', seal: 'Festive Pick' },
  { id: 'p4', name: 'Terracotta Cooling Bottle 1L', cat: 'Kitchen & Dining', price: 899, mrp: null, img: 'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=600&q=80', seal: 'Handmade' },
  { id: 'p5', name: 'Bankura Horse — Medium', cat: 'Home & Decor', price: 1650, mrp: null, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80', seal: 'Heritage Craft' },
  { id: 'p6', name: 'Hanging Wall Planter Pair', cat: 'Home & Decor', price: 799, mrp: 999, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', seal: 'Limited' },
  { id: 'p7', name: 'Kulhad Tea Cup Set (6)', cat: 'Kitchen & Dining', price: 549, mrp: null, img: 'https://images.unsplash.com/photo-1610701596061-cf3a8c620a9c?w=600&q=80', seal: 'Handmade' },
  { id: 'p8', name: 'Etched Kalash Pot', cat: 'Festive', price: 1250, mrp: null, img: 'https://images.unsplash.com/photo-1605883705077-8d3d3cfe6a99?w=600&q=80', seal: 'Heritage Craft' },
  { id: 'p9', name: 'Tabletop Oil Diya Lamp', cat: 'Festive', price: 650, mrp: 799, img: 'https://images.unsplash.com/photo-1604423043492-7d3b3bdaa68a?w=600&q=80', seal: 'Festive Pick' },
];

/* Filter pills shown above the product grid.
   'All' should always stay first. Add/remove categories here —
   just make sure every product's "cat" above matches one of these. */
const CATEGORIES = ['All', 'Home & Decor', 'Kitchen & Dining', 'Festive'];

/* Scrolling strip message under the hero section. */
const MARQUEE_ITEMS = [
  'Free shipping over ₹1499',
  'Hand-thrown, never moulded',
  'Pit-fired in Bishnupur',
  'Ships across India',
  'Each piece one-of-a-kind',
];

/* Free shipping threshold (rupees) and flat shipping fee below it. */
const FREE_SHIPPING_THRESHOLD = 1499;
const SHIPPING_FEE = 99;
