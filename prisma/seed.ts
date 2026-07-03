import { prisma } from "../lib/prisma";

async function main() {
  console.log("Seeding database...");

  await prisma.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      companyName: "JK Online Hub",
      logo: null,
      description: "We, JK Online Hub, are counted as one of the leading Wholesaler, Supplier & Importer of a wide range of the best quality of Household, Kitchen, Cleaning, Storage, and more products. Known for their seamless finish, durability, and value for money.",
      email: "TNEWKRISHNA@GMAIL.COM",
      phone: "+917573861719",
      address: "12 13 14 shop near kubeshwer mahdev mandir , sajipur memco road\r\nBilasiya, Gujarat - 382330",
      socialLinks: "{\facebook\:\"\",\instagram\:\"https://www.instagram.com/new_krishna_traders_/?igsh=ZDd4dm5zMndwMjlv\",\twitter\:\"\",\linkedin\:\"\",\whatsapp\:\"+917573861719\"}",
      seoTitle: null,
      seoDescription: null,
      updatedAt: "2026-07-03T08:13:14.501Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k45jp00007gkzbdgra71j" },
    update: {},
    create: {
      id: "cmr4k45jp00007gkzbdgra71j",
      name: "BOTTLES & JUICER",
      slug: "bottles-juicer",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:04.021Z",
      updatedAt: "2026-07-03T06:33:04.021Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k4a4300037gkzwvj1eojr" },
    update: {},
    create: {
      id: "cmr4k4a4300037gkzwvj1eojr",
      name: "KITCHEN TOOLS",
      slug: "kitchen-tools",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:09.939Z",
      updatedAt: "2026-07-03T06:33:09.939Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k4f6m00067gkzymp1n425" },
    update: {},
    create: {
      id: "cmr4k4f6m00067gkzymp1n425",
      name: "ORGANIZER",
      slug: "organizer",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:16.510Z",
      updatedAt: "2026-07-03T06:33:16.510Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k4mvj000a7gkzcri41gn8" },
    update: {},
    create: {
      id: "cmr4k4mvj000a7gkzcri41gn8",
      name: "BABY PRODUCTS",
      slug: "baby-products",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:26.479Z",
      updatedAt: "2026-07-03T06:33:26.479Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k4rgr000e7gkz44ndnner" },
    update: {},
    create: {
      id: "cmr4k4rgr000e7gkz44ndnner",
      name: "BAGS",
      slug: "bags",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:32.427Z",
      updatedAt: "2026-07-03T06:33:32.427Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k524c000j7gkz07zyfqd4" },
    update: {},
    create: {
      id: "cmr4k524c000j7gkz07zyfqd4",
      name: "Products",
      slug: "products",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:46.236Z",
      updatedAt: "2026-07-03T06:33:46.236Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k54fe000l7gkzftevc0h8" },
    update: {},
    create: {
      id: "cmr4k54fe000l7gkzftevc0h8",
      name: "CLEANING PRODUCTS",
      slug: "cleaning-products",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:33:49.226Z",
      updatedAt: "2026-07-03T06:33:49.226Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k5hw5000s7gkz8aepyu06" },
    update: {},
    create: {
      id: "cmr4k5hw5000s7gkz8aepyu06",
      name: "KIDS PRODUCTS",
      slug: "kids-products",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:34:06.677Z",
      updatedAt: "2026-07-03T06:34:06.677Z"
}
  });

  await prisma.category.upsert({
    where: { id: "cmr4k5otf000w7gkzzuu9uem7" },
    update: {},
    create: {
      id: "cmr4k5otf000w7gkzzuu9uem7",
      name: "HOME PRODUCTS",
      slug: "home-products",
      image: null,
      description: null,
      createdAt: "2026-07-03T06:34:15.651Z",
      updatedAt: "2026-07-03T06:34:15.651Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k472a00017gkz07cll3ff" },
    update: {},
    create: {
      id: "cmr4k472a00017gkz07cll3ff",
      name: "Vacuum Flast Set with 2 Mugs (Blue)",
      slug: "vacuum-flast-set-with-2-mugs-blue",
      sku: "SKU-0001",
      description: "Made of high quality 304 +201 stainless steel and food grade silicone sealing ring, safety, health and environmental protection.Five-layer insulation process, 12 hours long-lasting heat and cold preservation.Designed with a leak-resistant lid with handle without worrying about any spills. The lid can be used as a cup.With frosted finishes,the color lasts without rusting, fag or scratching.Easy to clean, the electrica polishing interior ensures that the hot water cup doesn't get moldy or retain its old taste.",
      shortDescription: "Made of high quality 304 +201 stainless steel and food grade silicone sealing ring, safety, health and environmental protection.Five-layer i",
      categoryId: "cmr4k45jp00007gkzbdgra71j",
      subCategory: null,
      images: "[\"/uploads/e8f14c48-72c6-44b7-a7f1-b02283d2c1f2.jpeg\",\"/uploads/f72104bf-af6d-4fdd-871b-dbef51efc8c0.jpeg\",\"/uploads/b31a86db-e863-4661-aa10-a4a478ab780e.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 199,
      stock: 75,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:05.987Z",
      updatedAt: "2026-07-03T06:33:05.987Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k49fi00027gkz24lrsz5g" },
    update: {},
    create: {
      id: "cmr4k49fi00027gkz24lrsz5g",
      name: "Sports Water Bottle with LED Temperature Display",
      slug: "sports-water-bottle-with-led-temperature-display",
      sku: "SKU-0002",
      description: "Intelligent temperature measurement on the touch LED screen] Water bottle The LED screen increases the brightness, it shows the water temperature, if it does not have water it will show the room temperature。[12 hour cold insulation lockout] double vacuum design。 This stainless steel water bottle has double insulating wall which optimally maintains hot and cold temperature .;",
      shortDescription: "Intelligent temperature measurement on the touch LED screen] Water bottle The LED screen increases the brightness, it shows the water temper",
      categoryId: "cmr4k45jp00007gkzbdgra71j",
      subCategory: null,
      images: "[\"/uploads/7dad500e-5b0a-46bd-a5d5-7dd5ebfa9c1b.jpeg\",\"/uploads/35850844-a9a0-40b6-8f76-efca65c6703c.jpeg\",\"/uploads/42dc016e-0eb5-41c1-b94e-f37fc8bb0043.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 150,
      stock: 78,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:09.054Z",
      updatedAt: "2026-07-03T06:33:09.054Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4b0t00047gkzn436pezg" },
    update: {},
    create: {
      id: "cmr4k4b0t00047gkzn436pezg",
      name: "2 in 1 Dumpling Maker Ghughra Momos Maker Machine,",
      slug: "2-in-1-dumpling-maker-ghughra-momos-maker-machine",
      sku: "SKU-0003",
      description: "2 in 1 Dumpling Maker: This dumpling maker can be used to make dumpling skins or wrap dumpling skins, very practical. Save your time better than ordinary dumpling tools.Easy to use: simply insert dough and press only once with this manual tortilla press, the flat, smooth surface makes each tortilla as flat as you need every time with every press. The edge adopts a wavy design that mimics handmade, you will make beautiful dumplings in a short time.High-quality Material: The dumpling maker is made of PP material, safe and durable, easy to use and clean, just need to rinse the flour with water. And is more convenient to use.",
      shortDescription: "2 in 1 Dumpling Maker: This dumpling maker can be used to make dumpling skins or wrap dumpling skins, very practical. Save your time better ",
      categoryId: "cmr4k4a4300037gkzwvj1eojr",
      subCategory: null,
      images: "[\"/uploads/477ae72c-af35-4109-a856-3cf3fabc68ef.jpeg\",\"/uploads/3f327b25-fb53-4ad6-aefe-15087489943e.jpeg\",\"/uploads/230749c0-2781-48f9-baf7-a153b19c6a80.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 70,
      stock: 79,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:11.117Z",
      updatedAt: "2026-07-03T06:33:11.117Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4dfq00057gkzsp6by8tg" },
    update: {},
    create: {
      id: "cmr4k4dfq00057gkzsp6by8tg",
      name: "JK Maggi Noodles & Soup Bowl with Spoon, Airtight Leakproof Lid, Handle,Spoon Holder, Stainless Steel Soup-tok Stainless Steel",
      slug: "jk-maggi-noodles-soup-bowl-with-spoon-airtight-leakproof-lid-handle-spoon-holder-stainless-steel-soup-tok-stainless-steel",
      sku: "SKU-0004",
      description: "🍜 Our Cup Bowl comes with Inner Stainless Steel and 2 Spoons is a flexible dining companion. This Bowl is perfect for serving poha, and rice also. ideal for Soups, Cereal, Oatmeal, Stews and More. It comes with handle &amp; 2 pcs spoon holds in handle, lid on it helps in easy carry it wherever you go.💫Perfect for Everyday Use: Whether for family dinners, work lunches,or casual meals, our cup bowl is designed for everyday use and convenience.♻️Portable and Convenient: With its compact size and included spoons, this cup bowl is ideal for on-the-go dining. It's perfect for office lunches, picnics, travel, and more.",
      shortDescription: "🍜 Our Cup Bowl comes with Inner Stainless Steel and 2 Spoons is a flexible dining companion. This Bowl is perfect for serving poha, and ric",
      categoryId: "cmr4k4a4300037gkzwvj1eojr",
      subCategory: null,
      images: "[\"/uploads/998d47f2-cac9-4324-8d66-62523c31e6b8.jpeg\",\"/uploads/c0554114-d913-4ded-8806-856027ad8f22.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 80,
      stock: 29,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:14.246Z",
      updatedAt: "2026-07-03T06:33:14.246Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4gy900077gkz2doh7nzs" },
    update: {},
    create: {
      id: "cmr4k4gy900077gkz2doh7nzs",
      name: "Storage Box for clothes Cloth storage box wardrobe organizers (66 Ltr ",
      slug: "storage-box-for-clothes-cloth-storage-box-wardrobe-organizers-66-ltr",
      sku: "SKU-0005",
      description: "TORAGE BOXES FOR CLOTHES -This storage box for clothes are the perfect way to store not just those expensive contain sarees, shirts, pants, undergarments, comforters, blankets, pillows, plush toys, jacket or other iron clothes without squeezing One single storage bag can contain 1 king size comforter, or 6 blankets, or 15 pieces of clothes, with so large capacity, most stuff can be stored in an easy and proper waySTACKABLE &amp; FOLDABLE- foldable storage box for clothes is made of Oxford fabric cloth, the appearance is transparent and visually pleasing, and it provides an elegant storage solution for your wardrobe needs. The steel frame supports the fabric and keeps the bag strong. Sturdy metal frame &amp; bottom plate. The stackable design maintains its shape with a sturdy metal frame and folds flat for storage when not in use",
      shortDescription: "TORAGE BOXES FOR CLOTHES -This storage box for clothes are the perfect way to store not just those expensive contain sarees, shirts, pants, ",
      categoryId: "cmr4k4f6m00067gkzymp1n425",
      subCategory: null,
      images: "[\"/uploads/4c40fbbd-9e20-4411-ab31-831435e1101c.jpeg\",\"/uploads/fc0787da-b6cb-410b-9a0a-a7385e7c38e3.jpeg\",\"/uploads/ac4c869e-1028-48a1-ba5c-f5a177010921.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 199,
      stock: 44,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:18.801Z",
      updatedAt: "2026-07-03T06:33:18.801Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4jni00087gkz8m1jd7vp" },
    update: {},
    create: {
      id: "cmr4k4jni00087gkz8m1jd7vp",
      name: " Set of 3, Stack it Up | Large Cloth Stacker | Foldable Shirt Storage Stacker for Wardrobe | Plastic Stackable Closet Organizer | White",
      slug: "set-of-3-stack-it-up-large-cloth-stacker-foldable-shirt-storage-stacker-for-wardrobe-plastic-stackable-closet-organizer-white",
      sku: "SKU-0006",
      description: "Maximize closet space: Neatly organize and easily access your shirts, optimizing your closet's storage capacity.Clutter-free Cupboard: Say NO to clutter and keep your closet tidy, segregated, and with this convenient organizer.Effortless organization: Designed for easy installation and hassle-free organizing of your clothes. It also has a smart easy-to-slide design and helps to easily reorganize.High-quality material: Made from the most durable materials for long-lasting use.",
      shortDescription: "Maximize closet space: Neatly organize and easily access your shirts, optimizing your closet's storage capacity.Clutter-free Cupboard: Say N",
      categoryId: "cmr4k4f6m00067gkzymp1n425",
      subCategory: null,
      images: "[\"/uploads/11bba460-d07f-45b2-9c07-3ec05cf470b0.jpeg\",\"/uploads/deb25ebe-91a4-4f2a-99c1-a63f896f998d.jpeg\",\"/uploads/af3b4b55-8cc8-4a48-9bec-ffe959a7d081.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 520,
      stock: 33,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:22.302Z",
      updatedAt: "2026-07-03T06:33:22.302Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4ln200097gkze67lvffs" },
    update: {},
    create: {
      id: "cmr4k4ln200097gkze67lvffs",
      name: "Anti-Slip Kitchen Cabinet Drawer Shelf Mat Liner Sheets (45 cm x 3 M Roll)",
      slug: "anti-slip-kitchen-cabinet-drawer-shelf-mat-liner-sheets-45-cm-x-3-m-roll",
      sku: "SKU-0007",
      description: "Maximize closet space: Neatly organize and easily access your shirts, optimizing your closet's storage capacity.Clutter-free Cupboard: Say NO to clutter and keep your closet tidy, segregated, and with this convenient organizer.Effortless organization: Designed for easy installation and hassle-free organizing of your clothes. It also has a smart easy-to-slide design and helps to easily reorganize.High-quality material: Made from the most durable materials for long-lasting use.",
      shortDescription: "Maximize closet space: Neatly organize and easily access your shirts, optimizing your closet's storage capacity.Clutter-free Cupboard: Say N",
      categoryId: "cmr4k4a4300037gkzwvj1eojr",
      subCategory: null,
      images: "[\"/uploads/5769f244-30cf-4096-a2bc-7767f120325d.jpeg\",\"/uploads/cb0736b0-3151-4460-ae02-43794cfd9197.jpeg\",\"/uploads/24dac813-236f-4d9a-b03b-99f8f3788209.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 160,
      stock: 14,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:24.878Z",
      updatedAt: "2026-07-03T06:33:24.878Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4n49000b7gkzi7kp5n4q" },
    update: {},
    create: {
      id: "cmr4k4n49000b7gkzi7kp5n4q",
      name: " Stainless Steel Baby Feeding Bottle 150ml, Hygienic Silicon Teat,BPA Free, Best Uses for Babies",
      slug: "stainless-steel-baby-feeding-bottle-150ml-hygienic-silicon-teat-bpa-free-best-uses-for-babies",
      sku: "SKU-0008",
      description: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids Bottles can Even be Warmed in a Cup of Hot Water★ PRODUCT MATERIALS AND HIS BENEFITS :- Food Grade Stainless Steel keeps Liquid Insulated for Hours. Anti-Colic Food- Grade Natural Flow Silicon Nipple, Super light weight, Bottle Body as Light as a Phone. Light Weight More Than Other Metal Bottle. No Coating or Welding Seen in the Interior of the Bottle, Eco-Friendly, Non- Toxic and Easy to Clean. Dishwasher safe.",
      shortDescription: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids",
      categoryId: "cmr4k4mvj000a7gkzcri41gn8",
      subCategory: null,
      images: "[\"/uploads/098c3f09-7091-4019-b95e-9347b0f3f00c.jpeg\"]",
      tags: "[]",
      featured: true,
      price: 230,
      stock: 21,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:26.793Z",
      updatedAt: "2026-07-03T06:33:26.793Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4ow7000c7gkzovm6e463" },
    update: {},
    create: {
      id: "cmr4k4ow7000c7gkzovm6e463",
      name: " Stainless Steel Baby Feeding Bottle 200ml, Hygienic Silicon Teat,BPA Free, Best Uses for Babies",
      slug: "stainless-steel-baby-feeding-bottle-200ml-hygienic-silicon-teat-bpa-free-best-uses-for-babies",
      sku: "SKU-0009",
      description: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids Bottles can Even be Warmed in a Cup of Hot Water★ PRODUCT MATERIALS AND HIS BENEFITS :- Food Grade Stainless Steel keeps Liquid Insulated for Hours. Anti-Colic Food- Grade Natural Flow Silicon Nipple, Super light weight, Bottle Body as Light as a Phone. Light Weight More Than Other Metal Bottle. No Coating or Welding Seen in the Interior of the Bottle, Eco-Friendly, Non- Toxic and Easy to Clean. Dishwasher safe.",
      shortDescription: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids",
      categoryId: "cmr4k4mvj000a7gkzcri41gn8",
      subCategory: null,
      images: "[\"/uploads/bfbb38d1-3e85-4a38-88c0-85db4ea716e7.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 260,
      stock: 42,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:29.095Z",
      updatedAt: "2026-07-03T06:33:29.095Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4pop000d7gkzx9qieup7" },
    update: {},
    create: {
      id: "cmr4k4pop000d7gkzx9qieup7",
      name: " Stainless Steel Baby Feeding Bottle 300ml, Hygienic Silicon Teat,BPA Free, Best Uses for Babies",
      slug: "stainless-steel-baby-feeding-bottle-300ml-hygienic-silicon-teat-bpa-free-best-uses-for-babies",
      sku: "SKU-0010",
      description: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids Bottles can Even be Warmed in a Cup of Hot Water★ PRODUCT MATERIALS AND HIS BENEFITS :- Food Grade Stainless Steel keeps Liquid Insulated for Hours. Anti-Colic Food- Grade Natural Flow Silicon Nipple, Super light weight, Bottle Body as Light as a Phone. Light Weight More Than Other Metal Bottle. No Coating or Welding Seen in the Interior of the Bottle, Eco-Friendly, Non- Toxic and Easy to Clean. Dishwasher safe.",
      shortDescription: "PRODUCT NAME AND HIS TYPE :- S.S Feeding Bottle with Silicon Nipple. The Unique Bottle Design Allows for Easy Heating and Cooling of Liquids",
      categoryId: "cmr4k4mvj000a7gkzcri41gn8",
      subCategory: null,
      images: "[\"/uploads/850c3593-00aa-428b-982c-8e7f9bf91014.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 290,
      stock: 14,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:30.121Z",
      updatedAt: "2026-07-03T06:33:30.121Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4sqa000f7gkzlz83fu2r" },
    update: {},
    create: {
      id: "cmr4k4sqa000f7gkzlz83fu2r",
      name: "Duffle Bag For Travelling|Waterproof And Large Travel Bag For Women's",
      slug: "duffle-bag-for-travelling-waterproof-and-large-travel-bag-for-women-s",
      sku: "SKU-0011",
      description: "PORTABLE LARGE CAPACITY FOLDING TRAVEL BAG : When fully folded, our foldable travel bag measures 11\"(L)*1.6\"(W)*7.1\"(H), it is small so you can easily Put it in your luggage and take it as you go. It has a very large capacity and is available in two unfolded sizes.EASY TO CARRY : Eranqo Duffle Bags For Travel can be carried on hand or shoulder, can also be easily placed on the suitcase through the fixed belt design on the back, convenient storage and transportation, make travel easier and more convenient.DURABLE &amp; WATERPROOF TRAVEL BAG : The Travel Duffel Bag is Made with lightweight waterproof and tear resistant oxford fabric, solid, anti-wrinkle, wear-resistant, waterproof, easy to scrub",
      shortDescription: "PORTABLE LARGE CAPACITY FOLDING TRAVEL BAG : When fully folded, our foldable travel bag measures 11\"(L)*1.6\"(W)*7.1\"(H), it is small so you ",
      categoryId: "cmr4k4rgr000e7gkz44ndnner",
      subCategory: null,
      images: "[\"/uploads/56cc3ba6-fa72-40d6-8f29-0959f616a251.jpeg\",\"/uploads/72988fd3-b769-4cb8-91d2-583e115bbe6c.jpeg\",\"/uploads/ae13b4e4-3fcc-414f-9bd8-da144578438d.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 250,
      stock: 27,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:34.066Z",
      updatedAt: "2026-07-03T06:33:34.066Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4vvc000g7gkz2ks0ih6v" },
    update: {},
    create: {
      id: "cmr4k4vvc000g7gkz2ks0ih6v",
      name: " Leather Small Jewelry Box, Travel Portable Jewelry Case For Ring, Pendant, Earring, Necklace, Bracelet Organizer Storage Holder Boxes ",
      slug: "leather-small-jewelry-box-travel-portable-jewelry-case-for-ring-pendant-earring-necklace-bracelet-organizer-storage-holder-boxes",
      sku: "SKU-0013",
      description: "QUALITY Material - Made from high quality deluxe synthetic PU leather exterior, and high quality flannel interiorTRAVEL SIZE - Size 3.9*3.9*2inch/10*10*5cm, this jewelry organizer is portable and light weight,easy to carry in your handbags or in your luggageSimple Design - Simple and compact design with elegant outlook, two removable dividers to meet different needsIdeal for storing jewelry including bracelets, earrings, rings, necklace, and other precious keepsakes",
      shortDescription: "QUALITY Material - Made from high quality deluxe synthetic PU leather exterior, and high quality flannel interiorTRAVEL SIZE - Size 3.9*3.9*",
      categoryId: "cmr4k4rgr000e7gkz44ndnner",
      subCategory: null,
      images: "[\"/uploads/3f171efe-25e3-43b1-909a-964c5355a819.jpeg\",\"/uploads/6323222b-d530-4dd9-b773-29dd0bc074e8.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 120,
      stock: 51,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:38.136Z",
      updatedAt: "2026-07-03T06:33:38.136Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k4ymw000h7gkz6452qr2i" },
    update: {},
    create: {
      id: "cmr4k4ymw000h7gkz6452qr2i",
      name: " Water Bottle 3 Pcs Set with Unbreakable silicon Motivational Time Marker with Straw Leakproof BPA free Non-toxic Fitness Sports Water Bottle for Office Sports Gym 2000ML 900ML 300ML",
      slug: "water-bottle-3-pcs-set-with-unbreakable-silicon-motivational-time-marker-with-straw-leakproof-bpa-free-non-toxic-fitness-sports-water-bottle-for-office-sports-gym-2000ml-900ml-300ml",
      sku: "SKU-0014",
      description: "BPA &amp; TOXIN FREE : BPA &amp; Toxin Free-triton Plastic Water 2000ml, 900ml, 300ml, Sipper Bottle Made Of Quality Food Grade Triton Co-polyester Plastic, This Water Bottle Is 100% BPA &amp; Toxin Free, and Healthy For Your Daily Water Drinking. perfect Water Bottle For Home, office, Gym, and Outdoor Sports.FUNCTIONAL DESIGN : The flip top lid is designed with a secure lock, making it dust and leak proof. Simply open with one hand by clicking the button. Feature with a silicone straw which allows you to enjoy spill-proof sipping. With a portable strap and carry loop handle it is easy for clip-on and on-the-go hydration. The mouth is wide enough to fit ice cubes, also easy to clean.",
      shortDescription: "BPA &amp; TOXIN FREE : BPA &amp; Toxin Free-triton Plastic Water 2000ml, 900ml, 300ml, Sipper Bottle Made Of Quality Food Grade Triton Co-po",
      categoryId: "cmr4k45jp00007gkzbdgra71j",
      subCategory: null,
      images: "[\"/uploads/c6f61e87-10e2-40c2-a611-7556357ffe0f.jpeg\",\"/uploads/2094257f-02da-4a13-973d-a882e15305a1.jpeg\",\"/uploads/ba942e5c-467a-4873-b407-61eb41d8c247.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 250,
      stock: 43,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:41.720Z",
      updatedAt: "2026-07-03T06:33:41.720Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k50q2000i7gkz01x9as5c" },
    update: {},
    create: {
      id: "cmr4k50q2000i7gkz01x9as5c",
      name: " Revolving Herb and Spice Rack Tower Organizer with 16 Jar Bottles for Kitchen (Multicolor)",
      slug: "revolving-herb-and-spice-rack-tower-organizer-with-16-jar-bottles-for-kitchen-multicolor",
      sku: "SKU-0015",
      description: "16 piece spice tower transparent container for easy access and pick of containers\nPackage contents: 16-pieces spice jars 160mlDesigned: beautifully designed carousel with 16 jar with chrome plated top, actual rack made from abs thermoplastic for impact resistance and toughnessDimension details of spice rack30cm x 17cm x 17cm l x b x hDimension details of individual spice rack10.5cm x 4.5cm x 4.5cm l x b x h&nbsp;&nbsp;&nbsp;",
      shortDescription: "16 piece spice tower transparent container for easy access and pick of containers\nPackage contents: 16-pieces spice jars 160mlDesigned: beau",
      categoryId: "cmr4k4a4300037gkzwvj1eojr",
      subCategory: null,
      images: "[\"/uploads/b5c37218-f100-4994-be6a-2d612280a4f0.jpeg\",\"/uploads/108eb31c-cdbf-41ea-b12b-8c0745f7d5db.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 280,
      stock: 41,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:44.426Z",
      updatedAt: "2026-07-03T06:33:44.426Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k52og000k7gkzhp942m5q" },
    update: {},
    create: {
      id: "cmr4k52og000k7gkzhp942m5q",
      name: "pice Rack 8 in 1 Masala Rack Set | Big Spice Container | Container jar bottle spice rack",
      slug: "pice-rack-8-in-1-masala-rack-set-big-spice-container-container-jar-bottle-spice-rack",
      sku: "SKU-0016",
      description: "Safe Material: The spice rack is made of food-grade plastic jar, which is safe and secure to store the spices, and the rectangular design transparent jar body is convenient for observing the spices.360-Degree Revolving: This spice rack features non-slip base 360-Degree a revolving design, saves more space and is easy to use while cooking.Compact Design: Its compact design and non-slip base rotating base add practicality to style for the ultimate spice set for your house or Countertop.Seasoning Organizer: Our spice rack organizer is the perfect way to keep your kitchen counter top organized and clutter-free. This stylish and functional organizer 8 in 1 spice jar that can accommodate a variety of spices, herbs, and other small items.",
      shortDescription: "Safe Material: The spice rack is made of food-grade plastic jar, which is safe and secure to store the spices, and the rectangular design tr",
      categoryId: "cmr4k524c000j7gkz07zyfqd4",
      subCategory: null,
      images: "[\"/uploads/421bf200-253b-42eb-bfd8-3b0647d95453.jpeg\",\"/uploads/abf78cc1-beb0-419e-a9ea-b56a17afdb8a.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 140,
      stock: 64,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:46.960Z",
      updatedAt: "2026-07-03T06:33:46.960Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k54wn000m7gkzv5qsc1eh" },
    update: {},
    create: {
      id: "cmr4k54wn000m7gkzv5qsc1eh",
      name: "Pipe Dredging Agent Pipe Block Remover Instant Action/Drain Cleaner Powder, Powerful Sink and Drain Cleaner,Powder Agent for Kitchen Toilet Pipe...",
      slug: "pipe-dredging-agent-pipe-block-remover-instant-action-drain-cleaner-powder-powerful-sink-and-drain-cleaner-powder-agent-for-kitchen-toilet-pipe",
      sku: "SKU-0017",
      description: "Instructions : pour about boiling water in to the drains(Especially in the cold winter), this step is very important,the enzymes need to be in warm water to fully function, then pour the Cleaning powder into the slot. wait about 30 minutes, then pour large amount water, the drains can easy open, if severe clogging, please use double of the amount and wait more time.It won't harm your drains, pipes or septic system, as its made only from non-corrosive &amp; non caustic materials. for 5x Cleaning Made of a non-corrosive formula that is safe on septic systems.",
      shortDescription: "Instructions : pour about boiling water in to the drains(Especially in the cold winter), this step is very important,the enzymes need to be ",
      categoryId: "cmr4k54fe000l7gkzftevc0h8",
      subCategory: null,
      images: "[\"/uploads/7346fd9d-940f-4a28-a275-f7ae8ad9086a.jpeg\",\"/uploads/93358bb8-02e6-4cb7-bb4e-2422390eeb81.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 30,
      stock: 53,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:49.847Z",
      updatedAt: "2026-07-03T06:33:49.847Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k56cn000n7gkz9cajunyx" },
    update: {},
    create: {
      id: "cmr4k56cn000n7gkz9cajunyx",
      name: "Shirt Stacker Wardrobe Storage/ Organiser for clothes & Shirts,(Pack of 1) ",
      slug: "shirt-stacker-wardrobe-storage-organiser-for-clothes-shirts-pack-of-1",
      sku: "SKU-0020",
      description: "MADE IN INDIA | PERFECT SIZE: This Shirt stacker fits the size of the folded shirt perfectly.PACKAGE CONTAINS : 2 Shirt StackerYOU DESERVE AN ORGANIZED CLOSET – People with wire closet shelves or open shelf space are sick and tired of clothes not staying in neat place. Your morning routine will be 10X smoother with these wonderful closet set in place. You can store sweaters, jeans, shirts or even T-shirts just imagine the feel when you, your partner and your kids can get ready in a flash the next time you go out!",
      shortDescription: "MADE IN INDIA | PERFECT SIZE: This Shirt stacker fits the size of the folded shirt perfectly.PACKAGE CONTAINS : 2 Shirt StackerYOU DESERVE A",
      categoryId: "cmr4k4f6m00067gkzymp1n425",
      subCategory: null,
      images: "[\"/uploads/5aefa017-8c4b-40a0-9e79-986bf69ff32f.jpeg\",\"/uploads/784cefdf-6253-49d1-9656-8bc9986e5255.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 140,
      stock: 63,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:51.719Z",
      updatedAt: "2026-07-03T06:33:51.719Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k581x000o7gkznyzk3jz5" },
    update: {},
    create: {
      id: "cmr4k581x000o7gkznyzk3jz5",
      name: "Compartment Foldable Grey Fabric Wardrobe Jeans, T-Shirt, and Pant Organizer Efficient Clothing Storage Solution for Wardrobe Organization & Clothes Management (Pack of 1)",
      slug: "compartment-foldable-grey-fabric-wardrobe-jeans-t-shirt-and-pant-organizer-efficient-clothing-storage-solution-for-wardrobe-organization-clothes-management-pack-of-1",
      sku: "SKU-0021",
      description: "Adjustable Size Options: Maximize your wardrobe's potential with our 7-grid jeans organizer, suitable for various garments such as sweaters and leggings. This versatile organizer is designed for efficient wardrobe management.Space-Saving and Portable: With dimensions of 40x27x21 cm, our jean organizer is foldable when not in use, saving valuable space. The two handles make it easy to handle and move, providing convenience in organizing your wardrobe.Versatile Capacity: Simple and stylish, our pants closet organizer seamlessly blends with any decor. The generous capacity of this wardrobe organizer resolves your daily storage challenges, ensuring an orderly garment drawer.Durable Construction: Made from robust and breathable fabric, our garment organizer surpasses polyester and nylon counterparts. Sturdy cardboard sides maintain the organizer's shape even when filled, offering durable and reliable storage.",
      shortDescription: "Adjustable Size Options: Maximize your wardrobe's potential with our 7-grid jeans organizer, suitable for various garments such as sweaters ",
      categoryId: "cmr4k4f6m00067gkzymp1n425",
      subCategory: null,
      images: "[\"/uploads/debf0b50-98db-42b5-92b7-ae7dcd0f542d.jpeg\",\"/uploads/300efcc1-0416-4588-b837-7d3faaec6a45.jpeg\",\"/uploads/a4e177bb-815e-482d-99ee-675b8db80ee9.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 140,
      stock: 71,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:53.925Z",
      updatedAt: "2026-07-03T06:33:53.925Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5al3000p7gkzynlfh5xy" },
    update: {},
    create: {
      id: "cmr4k5al3000p7gkzynlfh5xy",
      name: "360° Rotatable Adjustable Triangle Cleaning Mop with Stainless Steel Long Handle Push-Pull Squeezing Cleaning Mop Dry & Wet Mop Floor Windows Ceiling",
      slug: "360-rotatable-adjustable-triangle-cleaning-mop-with-stainless-steel-long-handle-push-pull-squeezing-cleaning-mop-dry-wet-mop-floor-windows-ceiling",
      sku: "SKU-0023",
      description: "【MULTIFUNCTIONAL DESIGN】The cleaning mop is designed in triangle shape and the dust mop head can rotate 360°.It is easy to clean and reach dead corners, such as sofa, bed, wall corners, ceiling corners and window corners.The mop has an efficient cleaning function for dust and hair, perfect for removing grease and dirt, so it also can be used for cleaning kitchens and shoes.【PREMIUM MATERIAL】The 360° rotating mop is equipped with thickened and encrypted microfiber mop cloth, which is very durable and can quickly absorb water within 5 seconds and has excellent adsorption capacity that traps the dust tightly. When used to wipe windows, save time and effort.This cleaning mop allows for hands-free wringing and controlled water release. No more bending over or wet hands!",
      shortDescription: "【MULTIFUNCTIONAL DESIGN】The cleaning mop is designed in triangle shape and the dust mop head can rotate 360°.It is easy to clean and reach d",
      categoryId: "cmr4k54fe000l7gkzftevc0h8",
      subCategory: null,
      images: "[\"/uploads/2ef3c715-4e33-4d81-ae85-aba5878a46be.jpeg\",\"/uploads/271db470-4f0a-483e-97f1-27bb83d9a685.jpeg\",\"/uploads/50413c4e-b961-4a7a-93fd-da8a9dc12c16.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 210,
      stock: 33,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:33:57.207Z",
      updatedAt: "2026-07-03T06:33:57.207Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5cug000q7gkziz4cph3u" },
    update: {},
    create: {
      id: "cmr4k5cug000q7gkziz4cph3u",
      name: "Ultra Soft Microfiber Car Cleaning Duster with Exatndable Handle Car Brush for Exterior Dust Remover Car Window Cleaning Dusting Brushes Car Accessories Tools (Grey)",
      slug: "ultra-soft-microfiber-car-cleaning-duster-with-exatndable-handle-car-brush-for-exterior-dust-remover-car-window-cleaning-dusting-brushes-car-accessories-tools-grey",
      sku: "SKU-0024",
      description: "Anti-scratch &amp; Lint Free - Premium Microfiber bristle prefect for exterior and interior without scratching. It owns strong adsorption force and can easily remove dust and dirt. No hair loss, no debris, light and durable, beautiful and delicate.Best Handle Design - Made from high quality stainless steel telescopic rod, easy to extend and close. Extendable handle allows for easy access in hard to reach areas. The soft foam handle allows for easy gripping and comfort while cleaning.Car accessories - Use water or use dry. No need for hazardous chemicals. Washable and reusable. Instantly lock onto somethings may make you uncomfortable like dust, pollen dander and more.",
      shortDescription: "Anti-scratch &amp; Lint Free - Premium Microfiber bristle prefect for exterior and interior without scratching. It owns strong adsorption fo",
      categoryId: "cmr4k54fe000l7gkzftevc0h8",
      subCategory: null,
      images: "[\"/uploads/1d22d7b2-3c38-40f4-a35a-26afbe35e5d1.jpeg\",\"/uploads/430f34bb-4060-436b-95ca-f0564cabfdc8.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 120,
      stock: 51,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:00.136Z",
      updatedAt: "2026-07-03T06:34:00.136Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5glg000r7gkzcguparow" },
    update: {},
    create: {
      id: "cmr4k5glg000r7gkzcguparow",
      name: "Microfiber Feather Duster Bendable & Extendable Fan Cleaning Duster with 100 inches Expandable Pole Handle Washable Duster for High Ceiling Fans,Window Blinds, Furniture ",
      slug: "microfiber-feather-duster-bendable-extendable-fan-cleaning-duster-with-100-inches-expandable-pole-handle-washable-duster-for-high-ceiling-fans-window-blinds-furniture",
      sku: "SKU-0025",
      description: "Extendable Long Pole With high quality 100 inch long stainless steel telescopic pole you dont need to take risks cleaning the high areas anymore just use this duster for cleaning and extend the length of duster pole from 30 to 100 inches to clean the dust easily.Bendable Head The wire built into the cleaning duster head is sturdy and bendable up to . The duster head can be bent into various angles you want cleaning all kinds of dead angles and hard to reach areas. Its a good helper for housework. And the duster is installed with a unique Soft Rubber Tip at the top to ensure you can clean the dust with complete peace of mind.",
      shortDescription: "Extendable Long Pole With high quality 100 inch long stainless steel telescopic pole you dont need to take risks cleaning the high areas any",
      categoryId: "cmr4k54fe000l7gkzftevc0h8",
      subCategory: null,
      images: "[\"/uploads/7d11dd27-3469-45b3-9461-662c13241ce5.jpeg\",\"/uploads/7f7c9076-8c23-4576-b935-c92908089e77.jpeg\",\"/uploads/d0c0e23b-2ee2-470e-96bd-eb7fcb678d39.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 90,
      stock: 77,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:04.996Z",
      updatedAt: "2026-07-03T06:34:04.996Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5j4v000t7gkzrpmc0843" },
    update: {},
    create: {
      id: "cmr4k5j4v000t7gkzrpmc0843",
      name: "Creation Learning Cushion Pillow Book Kids with English | Alphabet, Numbers, Animal Names | Kids Learning Toys ",
      slug: "creation-learning-cushion-pillow-book-kids-with-english-alphabet-numbers-animal-names-kids-learning-toys",
      sku: "SKU-0026",
      description: "kids learning toys Cushion :This Learning cushion help your kids to learn Basic things in Cushion Book FormatBest Gift for Birthday : if you looking to buy an product for gifting purpose than this cushion book is the best option for birthday giftKids Educational Toys : This Cushion Book helps your kids to educate is an unique way. kids can learn 12 things like ABCD, Fruits, Vegetables and other basic thingsAvailable in 5 Colours of Choice. Whichever you like... Red, Blue, Gold, Purple, and Pink",
      shortDescription: "kids learning toys Cushion :This Learning cushion help your kids to learn Basic things in Cushion Book FormatBest Gift for Birthday : if you",
      categoryId: "cmr4k5hw5000s7gkz8aepyu06",
      subCategory: null,
      images: "[\"/uploads/4b81b0c9-b44d-430d-bd6d-71abd3cf6fd2.jpeg\",\"/uploads/bc70324c-724c-433c-8e1f-a9c3ed7f0676.jpeg\",\"/uploads/86c9cfcb-57d0-4a9f-901f-b87e5da4c448.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 140,
      stock: 61,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:08.287Z",
      updatedAt: "2026-07-03T06:34:08.287Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5l1x000u7gkza4ezn5wk" },
    update: {},
    create: {
      id: "cmr4k5l1x000u7gkza4ezn5wk",
      name: "Ones Light Toys Projector For Kids,Sleeping Story Toys For Toddlers,Educational Learning Toys,Torch [Projector 9 Reels",
      slug: "ones-light-toys-projector-for-kids-sleeping-story-toys-for-toddlers-educational-learning-toys-torch-projector-9-reels",
      sku: "SKU-0027",
      description: "THE LITTLE ONES FLASHLIGHT PROJECTOR - The Little Ones Flashlight Projector is extremely interesting seeing pictures, telling stories and stimulating your kids language and cognitive skills, so they can enjoy the time with family or their friends. This flashlight projector contains of 9 projection disk a total of 72 animated patterns-Space,Dinosaur,Animals,Numbers,Foods,Vehicles,Alphabets,Vegetables &amp; Sea CreaturesPORTABLE DESIGN - The Little Ones Flashlight Projector is especially designed for kids and its very light and cute, the size of the projector is small to fit small hands well, easy to carry no matter where you go you can bring this together with your kids. This educational learning toy can be used as projection flashlight, allowing you to interact with your little one anytime.",
      shortDescription: "THE LITTLE ONES FLASHLIGHT PROJECTOR - The Little Ones Flashlight Projector is extremely interesting seeing pictures, telling stories and st",
      categoryId: "cmr4k5hw5000s7gkz8aepyu06",
      subCategory: null,
      images: "[\"/uploads/aa5420e2-37cf-4ba5-b929-651e5801030e.jpeg\",\"/uploads/b969f3a4-0ce9-4750-bc7f-92297b0d8e01.jpeg\",\"/uploads/39181e00-c8f8-4266-b2a0-bc7f97bff770.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 70,
      stock: 26,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:10.773Z",
      updatedAt: "2026-07-03T06:34:10.773Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5ng9000v7gkzeyfb8r76" },
    update: {},
    create: {
      id: "cmr4k5ng9000v7gkzeyfb8r76",
      name: " Ruffpad 8.5E Re-Writable LCD Writing Pad with Screen 21.5cm (8.5-inch) for Drawing, Playing, Handwriting Gifts for Kids & Adults, India's first notepad to save and share your child's first creatives via Ruffpad app on your Smartphone(Black)",
      slug: "ruffpad-8-5e-re-writable-lcd-writing-pad-with-screen-21-5cm-8-5-inch-for-drawing-playing-handwriting-gifts-for-kids-adults-india-s-first-notepad-to-save-and-share-your-child-s-first-creatives-via-ruffpad-app-on-your-smartphone-black",
      sku: "SKU-0028",
      description: "[LATEST IMPROVED TECHNOLOGY] : Portronics New RuffPad 8.5E LCD Writing Tablet uses the Newest LCD pressure-sensitive technology and lets you draw thick and thin lines as per your preference based on the pressure on the stylus. It comes with a large 8.5 inches display. The LCD screen is totally safe, radiation free, glare free, non-toxic, light-weight, comfortable and perfect in your or your little one’s hands.[REUSABLE &amp; ENVIRONMENT FRIENDLY] : The RuffPad 8.5E lets you do your bit for the environment by saving paper, pencils and erasers but it does not make you compromise on your creativity. The RuffPad 8.5E is erasable and re-usable making it the ideal tool for you or your child to harness their creative self. Use it to cultivate children's writing and painting ability and interests. It’s simple one-button clear command helps you erase and re-write over 100,000 times.",
      shortDescription: "[LATEST IMPROVED TECHNOLOGY] : Portronics New RuffPad 8.5E LCD Writing Tablet uses the Newest LCD pressure-sensitive technology and lets you",
      categoryId: "cmr4k5hw5000s7gkz8aepyu06",
      subCategory: null,
      images: "[\"/uploads/54abb398-c548-4dcf-9b29-d36a723a1fae.jpeg\",\"/uploads/a2387cbf-f55f-4262-b2ef-207bbc7dad72.jpeg\",\"/uploads/42f6706a-dbb7-4077-9087-54afdef30bbf.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 70,
      stock: 15,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:13.881Z",
      updatedAt: "2026-07-03T06:34:13.881Z"
}
  });

  await prisma.product.upsert({
    where: { id: "cmr4k5pxf000x7gkzu9qut82d" },
    update: {},
    create: {
      id: "cmr4k5pxf000x7gkzu9qut82d",
      name: "6 Layer shoes rack for home plastic, Adjustable Shoe stand organizer stackable storage bedroom entryway slots shelf footwear rack, Multi-Purpose durable plastic (Six L Shoe Rack)",
      slug: "6-layer-shoes-rack-for-home-plastic-adjustable-shoe-stand-organizer-stackable-storage-bedroom-entryway-slots-shelf-footwear-rack-multi-purpose-durable-plastic-six-l-shoe-rack",
      sku: "SKU-0030",
      description: "Sturdy shoe rack constructed from durable plastic material, ensuring longevity and reliability.The adjustable and movable design allows for easy customization of the storage space, making it suitable for organizing shoes, books, or any shelf items.Fixed height design provides stability and convenience, eliminating the need for customization while ensuring a reliable storage solution.Space-Saving Organizer: Embrace the compact and space-saving design that maximizes storage in your home. The shoe rack's ability to double as a shoe cupboard ensures efficient use of space, making it an ideal choice for those looking to optimize their living area.",
      shortDescription: "Sturdy shoe rack constructed from durable plastic material, ensuring longevity and reliability.The adjustable and movable design allows for ",
      categoryId: "cmr4k5otf000w7gkzzuu9uem7",
      subCategory: null,
      images: "[\"/uploads/4ac3e9ee-4249-4070-8de6-50d391a0cf4e.jpeg\",\"/uploads/5bdb2db4-99fd-4e0c-b779-140f2f82d826.jpeg\",\"/uploads/04c3b2c3-3d4c-4b40-9eaf-4569a55bc7e1.jpeg\"]",
      tags: "[]",
      featured: false,
      price: 210,
      stock: 64,
      brand: null,
      material: null,
      dimensions: null,
      weight: null,
      createdAt: "2026-07-03T06:34:17.091Z",
      updatedAt: "2026-07-03T06:34:17.091Z"
}
  });

  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
