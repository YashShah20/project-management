pg_dump postgres://yash:root@localhost/project-management | tee data_dump_`date +%F`.sql
psql postgres://aolalpow:root@john.db.elephantsql.com/aolalpow < data_dump_`date +%F`.sql