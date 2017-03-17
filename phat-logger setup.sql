-- CREATE SCHEMA
drop schema if exists `phat-logger`;
create schema `phat-logger`;
use `phat-logger`;

-- CREATE LOGGING USER
create user 'phat_user'@'localhost' identified by 'phat_user';
grant select, execute on `phat-logger`.* to 'phat_user'@'localhost';

-- CREATE LOG TABLE
drop table if exists log;
create table `phat-logger`.`log` (
	`id` int not null auto_increment,
    `datetime` datetime not null,
    `value` float not null,
    primary key (`id`));
    
-- CREATE LOG INPUT
drop procedure if exists `log`;
delimiter $$
use `phat-logger`$$
create procedure `log` (in p_value float)
begin
	insert into `phat-logger`.`log` (`datetime`, `value`)
    values (sysdate(), p_value);
end$$
delimiter ;

-- CREATE LOG OUTPUT
drop procedure if exists `out`;
delimiter $$
use `phat-logger`$$
create procedure `out` ()
begin
	select * from `phat-logger`.`log`;
end$$
delimiter ;