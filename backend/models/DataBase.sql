create table roles(
role_id SERIAL not null,
name varchar(20) not null,
primary key(role_id)
);
create table Permissions(
Permission_id SERIAL not null,
Permission varchar(20) not null,
primary key(Permission_id)
);
CREATE TABLE rolePermissions (
  rolePermissions_id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES Permissions(Permission_id),
  PRIMARY KEY (rolePermissions_id)
);
CREATE TABLE users (
  user_id SERIAL NOT NULL,
  userName varchar (20),
  firstName varchar (20),
  lastName varchar(20),
  email varchar(50),
  password varchar(20),
  country varchar(25),
  dateOfBirth date,
  profileImage varchar(255),
  bio varchar(255),
  role_id integer,
  is_deleted smallint default 0,
  foreign KEY(role_id) references roles(role_id),
  PRIMARY KEY (user_id)
);
CREATE TABLE posts (
  post_id SERIAL NOT NULL,
  body text,
  image varchar(255),
  user_id integer,
  created_at timestamp default now(),
  updated_at timestamp,
  is_deleted smallint default 0,
  foreign KEY(user_id) references users(user_id),
  PRIMARY KEY (post_id)
);
CREATE TABLE comments (
  comment_id SERIAL NOT NULL,
  comment text,
  commenter integer,
  post_id integer,
  created_at timestamp default now(),
  updated_at timestamp,
  is_deleted smallint default 0,
  foreign KEY(commenter) references users(user_id),
  foreign KEY(post_id) references posts(post_id),
  PRIMARY KEY (comment_id)
);
CREATE TABLE reacts (
  react_id SERIAL NOT NULL,
  user_id integer,
  post_id integer,
  comment_id integer,
  reacts text [],
  is_deleted smallint default 0,
  foreign KEY(comment_id) references comments(comment_id),
  foreign KEY(post_id) references posts(post_id),
  foreign KEY(user_id) references users(user_id),
  PRIMARY KEY (react_id)
);
CREATE TABLE folowers (
  follow_id SERIAL NOT NULL,
  follower_id integer,
  following_id integer,
   followed_at timestamp default now(),
  is_deleted smallint default 0,
  foreign KEY(following_id) references users(user_id),
  foreign KEY(follower_id) references users(user_id),
  PRIMARY KEY (follow_id)
);
CREATE TABLE messages (
  message_id SERIAL NOT NULL,
  sender integer,
  receiver integer,
  message_text text ,
  created_at timestamp default now(),
  is_deleted smallint default 0,
  foreign KEY(sender) references users(user_id),
  foreign KEY(receiver) references users(user_id),
  PRIMARY KEY (message_id)
);
CREATE TABLE notifications (
  notification_id SERIAL NOT NULL,
  user_id integer,
  action varchar(100),
  notification_time timestamp default now(),
  foreign KEY(user_id) references users(user_id),
  PRIMARY KEY (notification_id)
);

