// Motorcycle seed data – 104 bikes across all categories with local SVG images

function categoryImage(category) {
  return `/images/motorcycles/${category}.svg`;
}

const CATEGORY_BIKES = {
  cruiser: [
    { brand: 'Harley-Davidson', model: 'Street 750', year: 2022, price: 7500, cc: 749, hp: 53, torque: 60, weight: 223, fuel: 13, topSpeed: 180, trans: '5-speed manual' },
    { brand: 'Harley-Davidson', model: 'Sportster S', year: 2024, price: 15999, cc: 1252, hp: 121, torque: 125, weight: 228, fuel: 12, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'Harley-Davidson', model: 'Fat Boy', year: 2023, price: 21999, cc: 1868, hp: 93, torque: 155, weight: 313, fuel: 18, topSpeed: 175, trans: '6-speed manual' },
    { brand: 'Indian', model: 'Scout', year: 2023, price: 12999, cc: 1133, hp: 100, torque: 97, weight: 255, fuel: 13, topSpeed: 170, trans: '6-speed manual' },
    { brand: 'Indian', model: 'Chief', year: 2024, price: 18999, cc: 1890, hp: 108, torque: 146, weight: 322, fuel: 15, topSpeed: 165, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'Bolt', year: 2022, price: 8299, cc: 942, hp: 54, torque: 80, weight: 247, fuel: 12, topSpeed: 155, trans: '5-speed manual' },
    { brand: 'Honda', model: 'Rebel 500', year: 2023, price: 6499, cc: 471, hp: 46, torque: 44, weight: 189, fuel: 11, topSpeed: 140, trans: '6-speed manual' },
    { brand: 'Honda', model: 'Rebel 1100', year: 2024, price: 9999, cc: 1084, hp: 86, torque: 98, weight: 221, fuel: 14, topSpeed: 170, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Vulcan S', year: 2023, price: 7499, cc: 649, hp: 61, torque: 63, weight: 228, fuel: 14, topSpeed: 165, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Bonneville Bobber', year: 2023, price: 12999, cc: 1200, hp: 77, torque: 106, weight: 251, fuel: 12, topSpeed: 165, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'XDiavel', year: 2024, price: 24999, cc: 1262, hp: 160, torque: 127, weight: 247, fuel: 18, topSpeed: 220, trans: '6-speed manual' },
    { brand: 'BMW', model: 'R18', year: 2023, price: 17999, cc: 1802, hp: 91, torque: 158, weight: 345, fuel: 16, topSpeed: 165, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'Boulevard M109R', year: 2022, price: 15999, cc: 1783, hp: 123, torque: 160, weight: 299, fuel: 19, topSpeed: 180, trans: '5-speed manual' },
    { brand: 'Honda', model: 'Fury', year: 2022, price: 10999, cc: 1312, hp: 57, torque: 78, weight: 272, fuel: 13, topSpeed: 150, trans: '5-speed manual' },
    { brand: 'Yamaha', model: 'V-Star 250', year: 2022, price: 4499, cc: 249, hp: 21, torque: 20, weight: 147, fuel: 9, topSpeed: 120, trans: '5-speed manual' },
    { brand: 'Kawasaki', model: 'Vulcan 900', year: 2023, price: 8999, cc: 903, hp: 50, torque: 78, weight: 280, fuel: 17, topSpeed: 155, trans: '5-speed manual' },
    { brand: 'Royal Enfield', model: 'Meteor 350', year: 2024, price: 4599, cc: 349, hp: 20, torque: 27, weight: 191, fuel: 15, topSpeed: 110, trans: '5-speed manual' },
    { brand: 'Moto Guzzi', model: 'V9 Bobber', year: 2023, price: 9999, cc: 853, hp: 55, torque: 62, weight: 218, fuel: 14, topSpeed: 155, trans: '6-speed manual' },
  ],
  sportbike: [
    { brand: 'Kawasaki', model: 'Ninja ZX-6R', year: 2024, price: 10999, cc: 636, hp: 128, torque: 70, weight: 196, fuel: 17, topSpeed: 260, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Ninja ZX-10R', year: 2024, price: 16999, cc: 998, hp: 203, torque: 115, weight: 206, fuel: 17, topSpeed: 300, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'YZF-R1', year: 2024, price: 17999, cc: 998, hp: 200, torque: 113, weight: 201, fuel: 17, topSpeed: 299, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'YZF-R7', year: 2024, price: 8999, cc: 689, hp: 72, torque: 67, weight: 188, fuel: 13, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CBR600RR', year: 2024, price: 11999, cc: 599, hp: 118, torque: 66, weight: 194, fuel: 16, topSpeed: 260, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CBR1000RR-R Fireblade', year: 2024, price: 18999, cc: 999, hp: 214, torque: 113, weight: 201, fuel: 16, topSpeed: 299, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'GSX-R750', year: 2023, price: 13499, cc: 750, hp: 150, torque: 84, weight: 190, fuel: 17, topSpeed: 280, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'GSX-R1000R', year: 2024, price: 16999, cc: 999, hp: 199, torque: 117, weight: 202, fuel: 16, topSpeed: 299, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'Panigale V4', year: 2024, price: 24999, cc: 1103, hp: 214, torque: 124, weight: 195, fuel: 16, topSpeed: 305, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'Streetfighter V4', year: 2024, price: 22999, cc: 1103, hp: 208, torque: 123, weight: 198, fuel: 16, topSpeed: 290, trans: '6-speed manual' },
    { brand: 'BMW', model: 'S1000RR', year: 2024, price: 19999, cc: 999, hp: 205, torque: 113, weight: 197, fuel: 16, topSpeed: 306, trans: '6-speed manual' },
    { brand: 'Aprilia', model: 'RSV4', year: 2024, price: 21999, cc: 1099, hp: 217, torque: 122, weight: 201, fuel: 18, topSpeed: 305, trans: '6-speed manual' },
    { brand: 'KTM', model: 'RC 390', year: 2024, price: 5999, cc: 373, hp: 44, torque: 37, weight: 147, fuel: 13, topSpeed: 180, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Daytona 660', year: 2024, price: 9999, cc: 660, hp: 95, torque: 64, weight: 169, fuel: 14, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CBR500R', year: 2024, price: 7299, cc: 471, hp: 47, torque: 43, weight: 192, fuel: 14, topSpeed: 180, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'YZF-R3', year: 2024, price: 5499, cc: 321, hp: 42, torque: 30, weight: 169, fuel: 14, topSpeed: 180, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'GSX-8R', year: 2024, price: 9999, cc: 776, hp: 83, torque: 78, weight: 207, fuel: 14, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'Aprilia', model: 'RS 660', year: 2024, price: 11999, cc: 659, hp: 100, torque: 67, weight: 183, fuel: 15, topSpeed: 240, trans: '6-speed manual' },
  ],
  touring: [
    { brand: 'BMW', model: 'R1250 RT', year: 2024, price: 21999, cc: 1254, hp: 136, torque: 143, weight: 279, fuel: 25, topSpeed: 220, trans: '6-speed manual' },
    { brand: 'BMW', model: 'K1600 GT', year: 2024, price: 26999, cc: 1649, hp: 160, torque: 175, weight: 336, fuel: 24, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'Honda', model: 'Gold Wing', year: 2024, price: 28999, cc: 1833, hp: 124, torque: 170, weight: 383, fuel: 21, topSpeed: 200, trans: '7-speed DCT' },
    { brand: 'Harley-Davidson', model: 'Road Glide', year: 2024, price: 27999, cc: 1868, hp: 93, torque: 165, weight: 386, fuel: 22, topSpeed: 175, trans: '6-speed manual' },
    { brand: 'Harley-Davidson', model: 'Street Glide', year: 2024, price: 25999, cc: 1868, hp: 93, torque: 165, weight: 375, fuel: 22, topSpeed: 175, trans: '6-speed manual' },
    { brand: 'Indian', model: 'Roadmaster', year: 2024, price: 29999, cc: 1890, hp: 122, torque: 171, weight: 408, fuel: 22, topSpeed: 165, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'FJR1300', year: 2023, price: 16999, cc: 1298, hp: 141, torque: 138, weight: 289, fuel: 25, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Concours 14', year: 2023, price: 15999, cc: 1352, hp: 158, torque: 136, weight: 295, fuel: 22, topSpeed: 240, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Tiger Sport 660', year: 2024, price: 10999, cc: 660, hp: 80, torque: 64, weight: 192, fuel: 17, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'Multistrada V4 S', year: 2024, price: 22999, cc: 1158, hp: 170, torque: 125, weight: 215, fuel: 20, topSpeed: 250, trans: '6-speed manual' },
    { brand: 'Honda', model: 'NT1100', year: 2024, price: 14999, cc: 1084, hp: 101, torque: 104, weight: 238, fuel: 20, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'Tracer 9 GT', year: 2024, price: 13999, cc: 890, hp: 117, torque: 93, weight: 220, fuel: 19, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'KTM', model: '1290 Super Duke GT', year: 2024, price: 19999, cc: 1301, hp: 175, torque: 140, weight: 209, fuel: 23, topSpeed: 260, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'V-Strom 1050DE', year: 2024, price: 13999, cc: 1037, hp: 107, torque: 100, weight: 247, fuel: 20, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'Can-Am', model: 'Spyder RT', year: 2024, price: 24999, cc: 1330, hp: 115, torque: 130, weight: 427, fuel: 27, topSpeed: 165, trans: '6-speed semi-auto' },
    { brand: 'Triumph', model: 'Rocket 3 GT', year: 2024, price: 23999, cc: 2458, hp: 165, torque: 221, weight: 291, fuel: 18, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'BMW', model: 'R1250 GS', year: 2024, price: 19999, cc: 1254, hp: 136, torque: 143, weight: 249, fuel: 20, topSpeed: 210, trans: '6-speed manual' },
  ],
  'dirt-bike': [
    { brand: 'KTM', model: '450 SX-F', year: 2024, price: 10999, cc: 449, hp: 63, torque: 45, weight: 103, fuel: 7, topSpeed: 130, trans: '5-speed manual' },
    { brand: 'KTM', model: '250 SX-F', year: 2024, price: 9999, cc: 249, hp: 45, torque: 24, weight: 98, fuel: 7, topSpeed: 110, trans: '5-speed manual' },
    { brand: 'Honda', model: 'CRF450R', year: 2024, price: 10499, cc: 449, hp: 60, torque: 44, weight: 106, fuel: 7, topSpeed: 125, trans: '5-speed manual' },
    { brand: 'Honda', model: 'CRF250R', year: 2024, price: 8999, cc: 249, hp: 42, torque: 23, weight: 103, fuel: 7, topSpeed: 105, trans: '5-speed manual' },
    { brand: 'Yamaha', model: 'YZ450F', year: 2024, price: 9999, cc: 449, hp: 58, torque: 43, weight: 106, fuel: 7, topSpeed: 125, trans: '5-speed manual' },
    { brand: 'Yamaha', model: 'YZ250F', year: 2024, price: 8999, cc: 250, hp: 42, torque: 23, weight: 103, fuel: 7, topSpeed: 105, trans: '5-speed manual' },
    { brand: 'Kawasaki', model: 'KX450', year: 2024, price: 9999, cc: 449, hp: 59, torque: 44, weight: 105, fuel: 7, topSpeed: 125, trans: '5-speed manual' },
    { brand: 'Kawasaki', model: 'KX250', year: 2024, price: 8499, cc: 249, hp: 40, torque: 22, weight: 102, fuel: 7, topSpeed: 105, trans: '5-speed manual' },
    { brand: 'Suzuki', model: 'RM-Z450', year: 2024, price: 9499, cc: 449, hp: 57, torque: 42, weight: 106, fuel: 7, topSpeed: 120, trans: '5-speed manual' },
    { brand: 'Husqvarna', model: 'FC 450', year: 2024, price: 10999, cc: 449, hp: 63, torque: 45, weight: 103, fuel: 7, topSpeed: 130, trans: '5-speed manual' },
    { brand: 'Husqvarna', model: 'TC 250', year: 2024, price: 9999, cc: 249, hp: 45, torque: 24, weight: 98, fuel: 7, topSpeed: 110, trans: '5-speed manual' },
    { brand: 'Beta', model: 'RR 300', year: 2024, price: 9999, cc: 293, hp: 38, torque: 28, weight: 103, fuel: 7, topSpeed: 100, trans: '6-speed manual' },
    { brand: 'GasGas', model: 'MC 250F', year: 2024, price: 8999, cc: 249, hp: 42, torque: 23, weight: 102, fuel: 7, topSpeed: 105, trans: '5-speed manual' },
    { brand: 'Sherco', model: '300 SEF Factory', year: 2024, price: 10999, cc: 293, hp: 38, torque: 28, weight: 108, fuel: 7, topSpeed: 100, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CRF300L', year: 2024, price: 5499, cc: 286, hp: 27, torque: 27, weight: 131, fuel: 8, topSpeed: 120, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'WR250F', year: 2024, price: 8999, cc: 250, hp: 38, torque: 24, weight: 118, fuel: 7, topSpeed: 110, trans: '5-speed manual' },
    { brand: 'KTM', model: '300 XC-W', year: 2024, price: 10999, cc: 293, hp: 45, torque: 32, weight: 104, fuel: 7, topSpeed: 105, trans: '6-speed manual' },
  ],
  adventure: [
    { brand: 'BMW', model: 'R1250 GS Adventure', year: 2024, price: 21999, cc: 1254, hp: 136, torque: 143, weight: 268, fuel: 30, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'BMW', model: 'F850 GS Adventure', year: 2024, price: 14999, cc: 853, hp: 95, torque: 92, weight: 229, fuel: 23, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'KTM', model: '1290 Super Adventure R', year: 2024, price: 20999, cc: 1301, hp: 160, torque: 140, weight: 220, fuel: 23, topSpeed: 240, trans: '6-speed manual' },
    { brand: 'KTM', model: '890 Adventure R', year: 2024, price: 14999, cc: 889, hp: 105, torque: 100, weight: 196, fuel: 20, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'Multistrada V4 Rally', year: 2024, price: 24999, cc: 1158, hp: 170, torque: 125, weight: 227, fuel: 30, topSpeed: 250, trans: '6-speed manual' },
    { brand: 'Honda', model: 'Africa Twin', year: 2024, price: 14999, cc: 1084, hp: 101, torque: 105, weight: 231, fuel: 18, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'Honda', model: 'Africa Twin Adventure Sports', year: 2024, price: 17999, cc: 1084, hp: 101, torque: 105, weight: 243, fuel: 24, topSpeed: 200, trans: '6-speed DCT' },
    { brand: 'Yamaha', model: 'Tenere 700', year: 2024, price: 10999, cc: 689, hp: 72, torque: 68, weight: 205, fuel: 16, topSpeed: 180, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Tiger 1200 Rally Explorer', year: 2024, price: 19999, cc: 1160, hp: 147, torque: 130, weight: 245, fuel: 20, topSpeed: 220, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'V-Strom 650XT', year: 2024, price: 9999, cc: 645, hp: 70, torque: 62, weight: 216, fuel: 19, topSpeed: 190, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Versys 650', year: 2024, price: 8999, cc: 649, hp: 68, torque: 64, weight: 216, fuel: 17, topSpeed: 190, trans: '6-speed manual' },
    { brand: 'Royal Enfield', model: 'Himalayan', year: 2024, price: 5499, cc: 411, hp: 24, torque: 32, weight: 196, fuel: 15, topSpeed: 130, trans: '5-speed manual' },
    { brand: 'CFMoto', model: '800MT', year: 2024, price: 9999, cc: 799, hp: 95, torque: 77, weight: 231, fuel: 19, topSpeed: 190, trans: '6-speed manual' },
    { brand: 'Aprilia', model: 'Tuareg 660', year: 2024, price: 12999, cc: 659, hp: 80, torque: 70, weight: 204, fuel: 18, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'BMW', model: 'F750 GS', year: 2024, price: 11999, cc: 853, hp: 77, torque: 83, weight: 224, fuel: 15, topSpeed: 190, trans: '6-speed manual' },
    { brand: 'Husqvarna', model: 'Norden 901', year: 2024, price: 15999, cc: 889, hp: 105, torque: 100, weight: 204, fuel: 19, topSpeed: 210, trans: '6-speed manual' },
    { brand: 'Moto Guzzi', model: 'V85 TT', year: 2024, price: 12999, cc: 853, hp: 76, torque: 78, weight: 230, fuel: 21, topSpeed: 190, trans: '6-speed manual' },
  ],
  'naked-bike': [
    { brand: 'Yamaha', model: 'MT-09', year: 2024, price: 9999, cc: 890, hp: 117, torque: 93, weight: 189, fuel: 14, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'Yamaha', model: 'MT-07', year: 2024, price: 7999, cc: 689, hp: 72, torque: 67, weight: 184, fuel: 14, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Z900', year: 2024, price: 8999, cc: 948, hp: 125, torque: 98, weight: 210, fuel: 17, topSpeed: 240, trans: '6-speed manual' },
    { brand: 'Kawasaki', model: 'Z650', year: 2024, price: 7499, cc: 649, hp: 68, torque: 64, weight: 187, fuel: 15, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CB650R', year: 2024, price: 8999, cc: 649, hp: 95, torque: 64, weight: 201, fuel: 15, topSpeed: 220, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CB1000R', year: 2024, price: 12999, cc: 998, hp: 143, torque: 105, weight: 213, fuel: 16, topSpeed: 250, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Street Triple 765 RS', year: 2024, price: 12999, cc: 765, hp: 128, torque: 80, weight: 166, fuel: 14, topSpeed: 250, trans: '6-speed manual' },
    { brand: 'Triumph', model: 'Trident 660', year: 2024, price: 7999, cc: 660, hp: 80, torque: 64, weight: 189, fuel: 14, topSpeed: 200, trans: '6-speed manual' },
    { brand: 'BMW', model: 'S1000 R', year: 2024, price: 15999, cc: 999, hp: 165, torque: 114, weight: 197, fuel: 16, topSpeed: 280, trans: '6-speed manual' },
    { brand: 'Ducati', model: 'Monster', year: 2024, price: 11999, cc: 937, hp: 111, torque: 93, weight: 179, fuel: 14, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'KTM', model: '790 Duke', year: 2024, price: 10999, cc: 799, hp: 105, torque: 87, weight: 169, fuel: 14, topSpeed: 230, trans: '6-speed manual' },
    { brand: 'KTM', model: '390 Duke', year: 2024, price: 5999, cc: 373, hp: 44, torque: 37, weight: 149, fuel: 13, topSpeed: 170, trans: '6-speed manual' },
    { brand: 'Suzuki', model: 'GSX-S1000', year: 2024, price: 10999, cc: 999, hp: 152, torque: 108, weight: 214, fuel: 19, topSpeed: 250, trans: '6-speed manual' },
    { brand: 'Aprilia', model: 'Tuono 660', year: 2024, price: 10999, cc: 659, hp: 100, torque: 67, weight: 183, fuel: 15, topSpeed: 240, trans: '6-speed manual' },
    { brand: 'MV Agusta', model: 'Brutale 800', year: 2024, price: 14999, cc: 798, hp: 110, torque: 83, weight: 175, fuel: 16, topSpeed: 240, trans: '6-speed manual' },
    { brand: 'Honda', model: 'CB500F', year: 2024, price: 6999, cc: 471, hp: 47, torque: 43, weight: 189, fuel: 14, topSpeed: 180, trans: '6-speed manual' },
    { brand: 'Benelli', model: 'TNT 600i', year: 2024, price: 7999, cc: 600, hp: 85, torque: 55, weight: 213, fuel: 15, topSpeed: 210, trans: '6-speed manual' },
  ],
};

const DESCRIPTIONS = {
  cruiser: 'Classic cruiser styling with relaxed ergonomics and low-end torque for effortless highway cruising.',
  sportbike: 'Track-inspired sportbike with razor-sharp handling, aggressive aerodynamics, and race-bred performance.',
  touring: 'Long-distance touring machine with wind protection, premium comfort, and generous luggage capacity.',
  'dirt-bike': 'Lightweight off-road performer built for trails, motocross, and rugged terrain with responsive suspension.',
  adventure: 'Go-anywhere adventure bike with upright ergonomics, long travel suspension, and all-terrain capability.',
  'naked-bike': 'Streetfighter naked bike combining aggressive styling with versatile everyday riding performance.',
};

function engineType(cc, category) {
  if (category === 'dirt-bike') return `${cc}cc single-cylinder`;
  if (cc >= 1000) return `${cc}cc inline-four`;
  if (cc >= 750) return `${cc}cc parallel-twin`;
  if (category === 'cruiser') return `${cc}cc V-twin`;
  if (category === 'adventure' || category === 'touring') return `${cc}cc boxer twin`;
  return `${cc}cc parallel-twin`;
}

function buildMotorcycle(bike, category, index) {
  const name = `${bike.brand} ${bike.model}`;
  const imageUrl = categoryImage(category);
  const rating = Math.round((3.8 + (index % 12) * 0.1) * 10) / 10;

  return {
    name,
    brand: bike.brand,
    model: bike.model,
    year: bike.year,
    price: bike.price,
    description: DESCRIPTIONS[category],
    specifications: {
      engine: engineType(bike.cc, category),
      displacement: `${bike.cc} cc`,
      power: `${bike.hp} hp`,
      torque: `${bike.torque} Nm`,
      weight: `${bike.weight} kg`,
      fuelCapacity: `${bike.fuel} L`,
      topSpeed: `${bike.topSpeed} km/h`,
      transmissionType: bike.trans,
    },
    category,
    images: [
      { url: imageUrl, alt: name },
      { url: imageUrl, alt: `${name} side view` },
    ],
    stock: 3 + (index % 20),
    rating: Math.min(rating, 5),
    featured: index % 8 === 0,
  };
}

export function getMotorcycleSeedData() {
  const motorcycles = [];
  let index = 0;

  for (const [category, bikes] of Object.entries(CATEGORY_BIKES)) {
    for (const bike of bikes) {
      motorcycles.push(buildMotorcycle(bike, category, index));
      index++;
    }
  }

  return motorcycles;
}
