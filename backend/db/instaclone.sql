DROP DATABASE IF EXISTS instaclone;
CREATE DATABASE instaclone;

\c instaclone;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  email_add VARCHAR,
  fullname VARCHAR,
  profile_pic VARCHAR,
  user_description VARCHAR,
    UNIQUE(username)
);

INSERT INTO users (username, password_digest, email_add, fullname, profile_pic, user_description)
  VALUES 
    ('OptimusPrime', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'optimusprime@gmail.com', 'Optimus Prime', 'https://i.imgur.com/dM53kPP.jpg', 'First!!!'),
    ('eattheworld', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'eattheworld@gmail.com', 'Rebecca Malone', 'https://i.imgur.com/DMCL1EE.jpg', 'Conquering the world, one meal at a time.'),
    ('xyz', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'xyz@gmail.com', 'XYZ', 'https://i.imgur.com/fcu89jr.jpg', 'xray yankee zulu'),
    ('Lev', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'lev@gmail.com', 'Lev', 'https://i.imgur.com/67FUmGv.jpg', 'We are all dogs');
;

CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    photo_link VARCHAR,
    caption VARCHAR
);

INSERT INTO photos (user_id, photo_link, caption)
    VALUES 
    (1, 'https://i.imgur.com/dM53kPP.jpg', 'Use the ultimate app'),
    (1, 'https://i.imgur.com/vLIoOqb.jpg', '$___$'),
    (1, 'https://i.imgur.com/4PstoiF.png', 'it\s a bug'),
    (2, 'https://i.imgur.com/AOLmFM9.jpg', 'taiyaki with ice cream'),
    (2, 'https://i.imgur.com/AQhhVY5.jpg', 'Always a good time for doughnuts'),
    (2, 'https://i.imgur.com/wg73KhA.jpg', 'The best frozen treat is natural'),
    (2, 'https://i.imgur.com/NpwcJvl.jpg', 'DIY chia seed pudding. Link in bio.'),
    (2, 'https://i.imgur.com/Kblzuq1.jpg', 'Ice cream shakes'),
    (2, 'https://i.imgur.com/DMCL1EE.jpg', 'Coffee or tea?'),
    (2, 'https://i.imgur.com/UTrD4bl.jpg', 'Love these macarons.'),
    (3, 'https://i.imgur.com/ZdQOwq1.jpg', 'West coast best coast'),
    (3, 'https://i.imgur.com/Iuoi7Gg.jpg', 'Paradise'),
    (3, 'https://i.imgur.com/EZ0Qnxg.jpg', 'Silent Hill'),
    (3, 'https://i.imgur.com/RdjNiph.jpg', 'My love'),
    (3, 'https://i.imgur.com/nhKbxvl.jpg', 'Top of the world'),
    (3, 'https://i.imgur.com/OD8a8vx.jpg', 'Make love in this club'),
    (3, 'https://i.imgur.com/K80Xcnz.jpg', 'Woodstock in my mind'),
    (3, 'https://i.imgur.com/Tvz9Ro4.jpg', 'Booty'),
    (3, 'https://i.imgur.com/U1iWksL.jpg', 'Baby its cold outside'),
    (3, 'https://i.imgur.com/il7oLfd.jpg', 'Next'),
    (4, 'https://i.imgur.com/3eAA6j5.jpg', 'Dog'),
    (4, 'https://i.imgur.com/BumKSM3.jpg', 'Doggo'),
    (4, 'https://i.imgur.com/rfnizG7.jpg', 'Dogs'),
    (4, 'https://i.imgur.com/PqduKpK.jpg', 'Dogz');
    
    


CREATE TABLE likes (
    user_id INTEGER REFERENCES users,
    photo_id INTEGER REFERENCES photos
);

INSERT INTO likes (user_id, photo_id)
    VALUES 
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (1, 2),
    (3, 2),
    (4, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 6),
    (3, 6),
    (1, 7),
    (4, 7),
    (1, 8),
    (4, 8),
    (1, 9),
    (3, 9),
    (4, 9),
    (1, 10),
    (1, 11),
    (4, 11),
    (1, 12),
    (2, 12),
    (3, 12),
    (1, 13),
    (2, 13),
    (3, 13),
    (1, 14),
    (2, 14),
    (4, 14),
    (1, 15),
    (3, 15),
    (4, 15),
    (1, 16),
    (2, 16),
    (1, 17),
    (2, 17),
    (4, 17),
    (1, 18),
    (3, 18),
    (4, 18),
    (1, 19),
    (2, 19),
    (3, 19),
    (1, 20),
    (2, 20),
    (1, 21),
    (3, 21),
    (1, 22),
    (2, 22),
    (3, 22),
    (1, 23),
    (2, 23),
    (3, 23);


CREATE TABLE user_followers (
    user_id INTEGER REFERENCES users,
    follower_id INTEGER
);

INSERT INTO user_followers (user_id, follower_id)
    VALUES 
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 4),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 2),
    (4, 3);

CREATE TABLE user_following (
    user_id INTEGER REFERENCES users,
    following_id INTEGER
);

INSERT INTO user_following (user_id, following_id)
    VALUES 
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 2),
    (3, 4),
    (4, 1),
    (4, 2),
    (4, 3);