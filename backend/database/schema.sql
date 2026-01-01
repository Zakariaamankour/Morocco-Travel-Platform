-- Create Database
CREATE DATABASE IF NOT EXISTS morocco_travel;
USE morocco_travel;

-- Destinations Table
CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  region VARCHAR(100),
  highlights TEXT,
  best_time_to_visit VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_region (region)
);

-- Places Table
CREATE TABLE places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category ENUM('hotel', 'restaurant', 'activity', 'attraction', 'shopping') NOT NULL,
  image_url VARCHAR(500),
  price_range ENUM('budget', 'mid-range', 'luxury') DEFAULT 'mid-range',
  rating DECIMAL(2,1) DEFAULT 0.0,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(50),
  website VARCHAR(500),
  opening_hours TEXT,
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE,
  INDEX idx_destination (destination_id),
  INDEX idx_category (category),
  INDEX idx_slug (slug),
  INDEX idx_location (latitude, longitude)
);

-- Community Submissions Table
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT,
  place_name VARCHAR(255) NOT NULL,
  category ENUM('hotel', 'restaurant', 'activity', 'attraction', 'shopping') NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  submitter_name VARCHAR(255) NOT NULL,
  submitter_email VARCHAR(255) NOT NULL,
  why_special TEXT NOT NULL,
  image_url VARCHAR(500),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  admin_notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_submitted_at (submitted_at)
);

-- Trip Plans Table
CREATE TABLE trip_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destinations JSON NOT NULL,
  duration INT NOT NULL,
  traveler_type ENUM('solo', 'couple', 'family', 'group') NOT NULL,
  budget ENUM('budget', 'mid-range', 'luxury') NOT NULL,
  interests JSON NOT NULL,
  pace ENUM('relaxed', 'moderate', 'fast') NOT NULL,
  itinerary JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at)
);

-- Admin Users Table
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'moderator') DEFAULT 'moderator',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- Reviews Table (Optional - for future enhancement)
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
  INDEX idx_place (place_id),
  INDEX idx_rating (rating)
);
