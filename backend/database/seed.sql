USE morocco_travel;

-- Insert Destinations
INSERT INTO destinations (name, slug, description, image_url, region, highlights, best_time_to_visit) VALUES
('Marrakech', 'marrakech', 'The Red City, known for its bustling souks, stunning palaces, and the iconic Jemaa el-Fnaa square. A perfect blend of ancient traditions and modern luxury.', '/marrakech-medina-sunset-orange-red-colors.jpg', 'Central Morocco', 'Jemaa el-Fnaa Square, Majorelle Garden, Koutoubia Mosque, Bahia Palace', 'March-May, September-November'),
('Chefchaouen', 'chefchaouen', 'The Blue Pearl of Morocco, nestled in the Rif Mountains. Famous for its striking blue-washed buildings and laid-back atmosphere.', '/chefchaouen-blue-streets-morocco.jpg', 'Northern Morocco', 'Blue Medina, Spanish Mosque, Ras El Maa Waterfall, Akchour Waterfalls', 'April-June, September-October'),
('Fes', 'fes', 'Morocco''s spiritual and cultural capital, home to the world''s oldest university and the most complete medieval city in the Arab world.', '/fes-morocco-medina-ancient-streets.jpg', 'Northern Morocco', 'Fes el-Bali Medina, Al-Qarawiyyin University, Chouara Tannery, Bou Inania Madrasa', 'March-May, October-November'),
('Casablanca', 'casablanca', 'Morocco''s largest city and economic hub, featuring stunning Art Deco architecture and the magnificent Hassan II Mosque.', '/casablanca-hassan-ii-mosque.jpg', 'Western Morocco', 'Hassan II Mosque, Corniche, Old Medina, Rick''s Café', 'Year-round (mild climate)'),
('Essaouira', 'essaouira', 'A charming coastal town known for its beautiful beaches, fresh seafood, and vibrant arts scene. A UNESCO World Heritage site.', '/essaouira-coastal-city-morocco.jpg', 'Atlantic Coast', 'Medina, Skala de la Ville, Beach, Port, Art Galleries', 'April-October'),
('Sahara Desert', 'sahara-desert', 'Experience the magic of Morocco''s desert landscape with camel treks, luxury desert camps, and unforgettable starlit nights.', '/sahara-desert-sand-dunes.jpg', 'Southern Morocco', 'Erg Chebbi Dunes, Merzouga, Desert Camps, Camel Trekking', 'October-April');

-- Insert Places for Marrakech
INSERT INTO places (destination_id, name, slug, description, category, image_url, price_range, rating, address, latitude, longitude, phone, website, features) VALUES
(1, 'La Mamounia', 'la-mamounia', 'Legendary 5-star palace hotel set in beautiful gardens, offering world-class luxury and Moroccan hospitality.', 'hotel', '/la-mamounia-hotel.jpg', 'luxury', 4.8, 'Avenue Bab Jdid, Marrakech 40040', 31.6295, -7.9931, '+212 5243-88600', 'https://mamounia.com', '["spa", "pool", "restaurant", "wifi", "parking"]'),
(1, 'Nomad Restaurant', 'nomad-marrakech', 'Modern Moroccan cuisine with a rooftop terrace overlooking the medina. Innovative dishes using local ingredients.', 'restaurant', '/nomad-restaurant.jpg', 'mid-range', 4.7, '1 Derb Aarjane, Rahba Lakdima, Marrakech', 31.6252, -7.9890, '+212 5243-81609', 'https://nomadmarrakech.com', '["rooftop", "vegetarian_options", "reservations"]'),
(1, 'Jardin Majorelle', 'jardin-majorelle', 'Stunning botanical garden created by French artist Jacques Majorelle, later owned by Yves Saint Laurent.', 'attraction', '/majorelle-garden.jpg', 'budget', 4.9, 'Rue Yves Saint Laurent, Marrakech', 31.6410, -8.0033, '+212 5243-13047', 'https://jardinmajorelle.com', '["garden", "museum", "photography"]');

-- Insert Places for Chefchaouen
INSERT INTO places (destination_id, name, slug, description, category, image_url, price_range, rating, address, latitude, longitude, features) VALUES
(2, 'Casa Perleta', 'casa-perleta', 'Charming boutique hotel in a restored traditional house with stunning mountain views and authentic décor.', 'hotel', '/casa-perleta.jpg', 'mid-range', 4.6, 'Riad Souika, Chefchaouen', 35.1688, -5.2636, '["traditional", "mountain_view", "breakfast_included"]'),
(2, 'Cafe Clock Chefchaouen', 'cafe-clock-chefchaouen', 'Cultural café serving fusion food and hosting cooking classes, storytelling nights, and live music.', 'restaurant', '/cafe-clock.jpg', 'budget', 4.5, 'Medina, Chefchaouen', 35.1701, -5.2682, '["cultural_events", "cooking_classes", "vegetarian_options"]');

-- Insert Places for Fes
INSERT INTO places (destination_id, name, slug, description, category, image_url, price_range, rating, address, latitude, longitude, features) VALUES
(3, 'Riad Fes', 'riad-fes', 'Luxurious riad hotel with Andalusian gardens, spa, and panoramic views of the medina and Atlas Mountains.', 'hotel', '/riad-fes.jpg', 'luxury', 4.7, '5 Derb Ben Slimane, Fes', 34.0628, -4.9777, '["spa", "garden", "pool", "restaurant"]'),
(3, 'Chouara Tannery', 'chouara-tannery', 'Famous medieval leather tannery where traditional methods are still used. Iconic viewpoints from surrounding shops.', 'attraction', '/chouara-tannery.jpg', 'budget', 4.3, 'Hay Lablida Chouara, Fes el-Bali', 34.0665, -4.9765, '["historic", "photography", "shopping"]');

-- Insert some sample submissions
INSERT INTO submissions (destination_id, place_name, category, description, location, submitter_name, submitter_email, why_special, status) VALUES
(1, 'Roof Top Restaurant', 'restaurant', 'Amazing rooftop restaurant with traditional Moroccan cuisine and stunning sunset views.', 'Near Jemaa el-Fnaa, Marrakech', 'Sarah Johnson', 'sarah@example.com', 'Best sunset views in Marrakech with authentic tajine', 'pending'),
(2, 'Blue Pearl Ceramics', 'shopping', 'Family-run ceramic shop with beautiful handmade pottery in traditional blue colors.', 'Medina, Chefchaouen', 'Ahmed Benali', 'ahmed@example.com', 'Authentic craftsmanship passed down through generations', 'approved');
