DROP DATABASE IF EXISTS instaclone;
CREATE DATABASE instaclone;

\c instaclone;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR,
    password_digest VARCHAR,
    email VARCHAR,
    fullname VARCHAR,
    profile_url VARCHAR,
    user_description VARCHAR,
    UNIQUE(username)
);

INSERT INTO users (username, password_digest, email, fullname, profile_url, user_description)
    VALUES 
    ('ursula', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'ursula@gmail.com', 'Ursula', 'https://i.imgur.com/jdT5ElI.jpg', 'voice is a powerful thing'),
    ('voldemort', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'voldemort@gmail.com', 'Lord Voldemort', 'https://i.imgur.com/U6AnXOO.jpg', 'k e d a v r a'),
    ('vader', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'vader@gmail.com', 'Darth Vader', 'https://i.imgur.com/ei2IBPt.jpg?1', '...'),
    ('gaston', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'gaston@gmail.com', 'Gaston', 'https://i.imgur.com/gZwhWJP.jpg?1', '...'),
    ('yzma', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'yzma@gmail.com', 'Yzma', 'https://i.imgur.com/va6o2B1.png', 'Pull the lever!'),
    ('guest', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'guest@gmail.com', 'Guest', 'https://i.imgur.com/H14nFKL.jpg', 'I have a lot of random hobbies.')
;

CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    photo_url VARCHAR,
    caption VARCHAR
);

INSERT INTO photos (user_id, photo_url, caption)
    VALUES 
    (1, 'https://i.imgur.com/DuF8xQZ.jpg?1', 'Babieeees'),
    (1, 'https://i.imgur.com/GZdeKSz.jpg?1', 'Tattoo inspo. What do you guys think?'),
    (1, 'https://i.imgur.com/KEgcIPB.jpg', 'Tattoo inspo #2!'),
    (1, 'https://i.imgur.com/93tO7Nj.jpg?1', 'I want this look :)'),
    (1, 'https://i.imgur.com/QoNY8nK.jpg', '2018 is gonna be my year'),
    (1, 'https://i.imgur.com/dwOUR3N.jpg?1', 'Me and the babes'),
    (1, 'https://i.imgur.com/lsRKb8P.jpg?1', 'Anyone looking for a pair of legs? DM me.'),
    (2, 'https://i.imgur.com/VvLHe23.jpg?1', 'Love this legend. Which one would you choose?'),
    (2, 'https://i.imgur.com/7eFW0UU.jpg', 'The love of my life.'),
    (2, 'https://i.imgur.com/R5k2osc.jpg?1', 'For spirit week. #SlytherinForever'),
    (3, 'https://i.imgur.com/58lHHgM.jpg', 'I will always love you. #wcw'),
    (3, 'https://i.imgur.com/A9BuM7h.jpg', 'Pledge your allegiance now.'),
    (3, 'https://i.imgur.com/GGwv292.jpg?1', 'The empire''s might and strength'),
    (4, 'https://i.imgur.com/q0A8DF6.png?1', 'had some fun night out in town ;)'),
    (4, 'https://i.imgur.com/fITvw7j.jpg', 'this was #candid'),
    (4, 'https://i.imgur.com/Tz8OVde.gif?1', 'name someone more talented'),
    (4, 'https://i.imgur.com/sCNvn0V.jpg', 'i think im in love'),
    (4, 'https://i.imgur.com/TDF5Qdl.jpg?1', 'psa: this beast is dangerous and a threat to humanity!'),
    (5, 'https://i.imgur.com/VazQjIc.jpg?1', 'Me filling in for the emperor in his absence!'),
    (5, 'https://i.imgur.com/CvN5HZV.png?1', 'If you''ve seen this llama, please contact me or Kronk.'),
    (5, 'https://i.imgur.com/oWtD2vw.gifv', 'It''s not even my birthday...'),
    (5, 'https://i.imgur.com/CAXGvsd.png?1', 'Science!'),
    (5, 'https://i.imgur.com/DcWsPHM.jpg?1', 'I HATE THIS SQUIRREL')
;
    
    
CREATE TABLE likes (
    user_id INTEGER REFERENCES users,
    photo_id INTEGER REFERENCES photos
);

INSERT INTO likes (user_id, photo_id)
    VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4), 
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 8),
    (2, 9),
    (2, 10),
    (3, 11),
    (3, 12),
    (3, 13),
    (4, 14),
    (4, 15),
    (4, 16),
    (4, 17),
    (4, 18),
    (5, 19),
    (5, 20),
    (5, 21),
    (5, 22),
    (5, 23)
;


CREATE TABLE follows (
    followee_id INTEGER,
    follower_id INTEGER 
); 

INSERT INTO follows (followee_id, follower_id) 
    VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 2),
    (2, 1),
    (2, 5),
    (3, 3),
    (3, 1),
    (4, 4),
    (4, 1),
    (5, 5),
    (6, 6),
    (6, 1)
;
