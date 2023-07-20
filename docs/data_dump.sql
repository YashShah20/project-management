--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: issues; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.issues (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    type integer DEFAULT 1,
    severity integer DEFAULT 1,
    status integer DEFAULT 1,
    reported_by integer,
    reported_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    assigned_to integer,
    project_id integer
);


ALTER TABLE public.issues OWNER TO yash;

--
-- Name: issue_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issue_id_seq OWNER TO yash;

--
-- Name: issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.issue_id_seq OWNED BY public.issues.id;


--
-- Name: project_documents; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.project_documents (
    id integer NOT NULL,
    name text NOT NULL,
    url text,
    uploaded_by integer,
    uploaded_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    project_id integer
);


ALTER TABLE public.project_documents OWNER TO yash;

--
-- Name: project_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.project_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_documents_id_seq OWNER TO yash;

--
-- Name: project_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.project_documents_id_seq OWNED BY public.project_documents.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    start_date date NOT NULL,
    end_date date,
    status integer DEFAULT 1
);


ALTER TABLE public.projects OWNER TO yash;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO yash;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.projects.id;


--
-- Name: project_users; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.project_users (
    id integer NOT NULL,
    project_id integer,
    user_id integer,
    role_id integer,
    profile_id integer,
    join_date date,
    is_active boolean DEFAULT true
);


ALTER TABLE public.project_users OWNER TO yash;

--
-- Name: project_users_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.project_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_users_id_seq OWNER TO yash;

--
-- Name: project_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.project_users_id_seq OWNED BY public.project_users.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    title text NOT NULL,
    access_level integer
);


ALTER TABLE public.roles OWNER TO yash;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO yash;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.roles.id;


--
-- Name: task_assignments; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.task_assignments (
    id integer NOT NULL,
    task_id integer,
    user_id integer,
    assignment_date date
);


ALTER TABLE public.task_assignments OWNER TO yash;

--
-- Name: task_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.task_assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_assignments_id_seq OWNER TO yash;

--
-- Name: task_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.task_assignments_id_seq OWNED BY public.task_assignments.id;


--
-- Name: task_dependencies; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.task_dependencies (
    task_id integer,
    dependent_task_id integer
);


ALTER TABLE public.task_dependencies OWNER TO yash;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    due_date date,
    priority_level integer DEFAULT 1,
    status integer DEFAULT 1,
    completion_date date,
    project_id integer
);


ALTER TABLE public.tasks OWNER TO yash;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO yash;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.tasks.id;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.user_profiles (
    id integer NOT NULL,
    title text NOT NULL,
    description text
);


ALTER TABLE public.user_profiles OWNER TO yash;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.user_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_profiles_id_seq OWNER TO yash;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.user_profiles_id_seq OWNED BY public.user_profiles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email text NOT NULL,
    mobile_number text,
    is_admin boolean DEFAULT false,
    password text,
    password_reset_token text
);


ALTER TABLE public.users OWNER TO yash;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO yash;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: issues id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issues ALTER COLUMN id SET DEFAULT nextval('public.issue_id_seq'::regclass);


--
-- Name: project_documents id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents ALTER COLUMN id SET DEFAULT nextval('public.project_documents_id_seq'::regclass);


--
-- Name: project_users id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users ALTER COLUMN id SET DEFAULT nextval('public.project_users_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: task_assignments id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignments ALTER COLUMN id SET DEFAULT nextval('public.task_assignments_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: user_profiles id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.user_profiles ALTER COLUMN id SET DEFAULT nextval('public.user_profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.issues (id, title, description, type, severity, status, reported_by, reported_on, assigned_to, project_id) FROM stdin;
1	Optional motivating info-mediaries	Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.	5	2	4	4	2023-05-29 08:49:03	2	18
2	Open-source bottom-line throughput	Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.	4	3	3	5	2022-10-25 04:30:07	3	7
3	Devolved grid-enabled toolset	Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.	4	4	2	8	2023-07-08 08:08:03	1	8
4	Networked mission-critical collaboration	Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.	1	5	4	15	2023-05-15 15:48:17	11	3
5	Profound methodical parallelism	Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.	5	2	2	12	2022-12-05 09:20:52	18	20
6	Open-architected explicit customer loyalty	Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.	4	1	3	6	2023-03-31 06:47:25	4	4
7	Polarised next generation toolset	Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.	3	2	3	20	2023-02-18 14:19:48	7	24
8	Function-based 3rd generation projection	Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.	4	3	4	12	2023-01-01 19:11:52	14	18
9	User-friendly foreground collaboration	Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.	4	4	3	18	2022-10-01 22:04:27	5	17
10	Intuitive holistic software	Maecenas pulvinar lobortis est. Phasellus sit amet erat.	5	3	4	14	2023-04-05 11:14:11	15	18
11	Total dedicated definition	Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.	5	5	3	20	2022-12-19 00:34:52	2	25
12	Digitized explicit forecast	Suspendisse accumsan tortor quis turpis. Sed ante.	3	4	2	17	2022-11-11 18:18:29	20	23
13	Organized didactic forecast	Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.	2	1	3	19	2022-10-29 18:56:36	16	30
14	Future-proofed uniform utilisation	Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.	2	5	3	6	2022-11-03 08:00:20	18	9
15	Virtual intangible collaboration	Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.	1	5	4	18	2023-03-24 06:10:57	12	24
16	Customer-focused interactive strategy	Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.	2	3	4	8	2023-04-07 02:01:55	19	18
17	Down-sized demand-driven approach	In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.	1	4	4	11	2023-04-27 21:17:10	9	16
18	Vision-oriented tangible infrastructure	Nulla ac enim.	3	4	2	9	2022-11-15 19:00:09	16	3
19	Adaptive multi-state support	In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.	4	4	3	11	2023-01-18 21:43:59	20	28
20	Operative high-level neural-net	Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.	1	1	4	16	2022-09-11 08:15:59	6	19
21	Virtual uniform website	Quisque ut erat.	3	1	3	18	2023-04-16 05:54:46	6	16
22	Enhanced asymmetric moderator	In hac habitasse platea dictumst. Etiam faucibus cursus urna.	4	1	3	4	2023-05-12 01:47:31	4	3
23	Optimized solution-oriented moderator	Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.	3	4	4	3	2022-09-11 14:54:26	17	13
24	Organized non-volatile process improvement	Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.	2	5	1	17	2022-11-11 14:38:28	8	16
48	Open-source disintermediate flexibility	Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.	2	1	2	5	2022-09-03 07:58:26	14	17
50	Business-focused neutral matrix	Morbi non quam nec dui luctus rutrum. Nulla tellus.	3	2	4	1	2023-03-11 15:13:00	12	25
25	Balanced asymmetric local area network	Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.	3	1	3	15	2022-11-14 12:45:13	13	27
26	Virtual analyzing framework	Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.	1	2	1	12	2022-08-17 13:36:05	19	11
27	Universal fresh-thinking focus group	Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.	5	5	2	18	2022-07-31 22:45:31	10	7
28	Automated systemic ability	Integer non velit.	4	2	2	4	2023-03-02 11:39:28	9	19
29	Reverse-engineered composite methodology	Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.	5	5	2	4	2022-09-30 22:44:26	5	15
30	Grass-roots local hierarchy	Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.	3	1	3	16	2022-12-04 18:43:09	16	5
31	Implemented executive concept	Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.	4	1	2	2	2022-07-23 11:32:18	3	4
32	Advanced explicit intranet	In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.	2	1	2	11	2023-03-20 21:58:56	17	4
33	Automated next generation intranet	Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.	5	4	2	19	2022-09-11 18:23:02	8	23
34	Team-oriented multi-tasking matrices	Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.	4	2	2	2	2023-03-28 07:46:50	9	19
35	De-engineered analyzing knowledge user	Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.	3	2	3	3	2023-06-05 03:20:30	13	19
36	Grass-roots hybrid infrastructure	Nam tristique tortor eu pede.	1	2	3	7	2022-08-01 04:08:38	16	14
37	Right-sized coherent service-desk	Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.	2	1	3	9	2022-09-04 03:01:57	16	28
38	User-centric maximized focus group	Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.	5	1	4	1	2023-03-26 14:52:27	4	19
39	Polarised methodical installation	Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.	1	2	1	2	2023-04-20 09:55:54	2	26
40	Intuitive reciprocal Graphic Interface	Etiam vel augue.	1	1	2	20	2022-09-25 18:12:11	6	23
41	Seamless logistical system engine	Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.	1	2	2	3	2022-11-22 05:43:16	1	28
42	Decentralized reciprocal protocol	Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.	1	4	1	8	2023-03-23 02:09:35	12	27
43	Grass-roots bifurcated contingency	Morbi quis tortor id nulla ultrices aliquet.	1	1	2	13	2023-04-09 16:12:59	2	21
44	Persistent solution-oriented benchmark	Praesent blandit. Nam nulla.	1	2	4	20	2022-08-30 04:22:35	18	17
45	Object-based transitional process improvement	Nulla tellus.	1	4	4	5	2022-09-17 21:42:59	7	9
46	Adaptive optimal functionalities	Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.	5	3	4	5	2022-12-09 15:25:49	13	12
47	Polarised holistic system engine	Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.	4	4	3	16	2023-04-20 17:43:34	9	1
49	Decentralized leading edge orchestration	Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.	5	3	3	9	2023-04-05 00:35:59	12	3
51	Centralized discrete protocol	Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.	1	2	4	4	2023-06-14 11:33:40	7	12
52	Re-contextualized mission-critical success	Pellentesque at nulla. Suspendisse potenti.	5	2	3	6	2022-08-19 22:29:39	10	4
53	Innovative well-modulated encryption	Vivamus vestibulum sagittis sapien.	5	4	3	19	2023-06-16 13:47:26	13	25
54	Compatible incremental hardware	Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.	3	1	4	3	2022-10-28 22:20:30	15	1
55	Ergonomic asynchronous superstructure	Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.	3	4	3	19	2023-02-16 03:55:55	2	12
56	Customizable bifurcated utilisation	In eleifend quam a odio.	5	2	4	3	2023-06-28 22:41:52	13	12
57	Realigned actuating Graphic Interface	Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.	3	1	2	6	2022-08-17 09:47:03	18	15
58	Open-source transitional internet solution	Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.	3	2	1	4	2023-07-10 01:52:10	5	26
59	Persistent non-volatile budgetary management	Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.	1	1	3	7	2022-11-15 16:46:53	13	6
60	Cloned asynchronous matrix	Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.	4	3	1	18	2022-12-05 18:52:35	11	22
61	Diverse non-volatile benchmark	Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.	5	2	2	15	2022-12-12 00:07:06	11	27
62	Enterprise-wide zero defect success	Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.	3	5	2	3	2023-06-12 05:56:17	4	25
63	De-engineered next generation parallelism	Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.	5	5	3	8	2023-07-09 17:51:06	19	12
64	Diverse fresh-thinking productivity	Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.	1	4	2	7	2023-06-11 16:44:47	13	7
65	Expanded composite challenge	In congue.	5	3	1	2	2022-09-25 03:34:57	13	6
66	Progressive 3rd generation time-frame	Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.	2	4	2	3	2022-12-31 20:45:52	2	1
67	Mandatory logistical structure	Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.	5	3	3	5	2023-07-17 13:02:41	13	4
68	Vision-oriented 3rd generation contingency	Aenean lectus.	5	1	3	2	2022-09-30 02:14:48	1	13
69	Enhanced optimal projection	Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.	3	5	1	16	2023-04-03 23:29:43	4	5
70	Grass-roots reciprocal implementation	Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.	5	3	1	6	2022-09-08 06:04:29	7	21
71	Cloned radical parallelism	Pellentesque at nulla.	1	3	2	12	2023-01-19 13:43:31	5	26
72	Cross-group bi-directional focus group	Proin risus.	3	5	4	11	2022-12-05 12:28:05	1	11
73	Upgradable dynamic encryption	In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.	4	1	3	20	2023-07-13 19:03:10	1	1
74	Digitized 4th generation projection	Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.	2	4	2	16	2023-05-10 02:55:06	7	18
75	Right-sized background framework	Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.	1	1	3	7	2023-01-25 13:26:00	3	30
\.


--
-- Data for Name: project_documents; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.project_documents (id, name, url, uploaded_by, uploaded_on, project_id) FROM stdin;
\.


--
-- Data for Name: project_users; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.project_users (id, project_id, user_id, role_id, profile_id, join_date, is_active) FROM stdin;
1	4	5	1	7	2023-07-29	t
2	17	11	1	7	2023-07-28	t
3	25	18	1	5	2023-07-07	t
4	30	6	1	7	2023-07-03	t
5	23	11	1	10	2023-07-01	t
6	9	25	1	1	2023-07-27	t
7	9	14	1	3	2023-07-24	t
8	17	19	1	3	2023-07-21	t
9	8	1	1	5	2023-07-01	t
10	28	2	1	3	2023-07-03	t
11	18	18	1	6	2023-07-11	t
12	9	5	1	4	2023-07-26	t
13	17	24	1	10	2023-07-24	t
14	18	1	1	4	2023-07-07	t
15	30	17	1	1	2023-07-10	t
16	23	3	1	9	2023-07-30	t
17	12	6	1	9	2023-07-25	t
18	8	24	1	7	2023-07-27	t
19	1	18	1	10	2023-07-28	t
20	25	1	1	5	2023-07-24	t
21	30	8	1	8	2023-07-10	t
22	5	9	1	7	2023-07-28	t
23	5	16	1	6	2023-07-09	t
24	1	10	1	10	2023-07-10	t
25	17	19	1	5	2023-07-29	t
26	18	6	1	7	2023-07-14	t
27	1	21	1	4	2023-07-19	t
28	9	22	1	1	2023-07-24	t
29	17	15	1	4	2023-07-11	t
30	3	7	1	4	2023-07-22	t
31	6	6	1	5	2023-07-25	t
32	2	9	1	1	2023-07-07	t
33	27	9	1	3	2023-07-25	t
34	25	14	1	2	2023-07-30	t
35	17	3	1	5	2023-07-24	t
36	12	3	1	2	2023-07-21	t
37	8	10	1	5	2023-07-22	t
38	3	3	1	9	2023-07-04	t
39	5	3	1	4	2023-07-05	t
40	30	6	1	6	2023-07-16	t
41	27	8	1	9	2023-07-25	t
42	9	17	1	2	2023-07-19	t
43	6	8	1	4	2023-07-22	t
44	21	8	1	7	2023-07-02	t
45	3	9	1	4	2023-07-28	t
46	25	11	1	8	2023-07-08	t
47	28	5	1	9	2023-07-14	t
48	25	21	1	10	2023-07-26	t
49	30	9	1	7	2023-07-06	t
50	20	12	1	10	2023-07-17	t
51	5	12	1	7	2023-07-06	t
52	19	21	1	3	2023-07-02	t
53	11	17	1	7	2023-07-28	t
54	26	16	1	6	2023-07-27	t
55	6	25	1	4	2023-07-30	t
56	18	11	1	7	2023-07-16	t
57	8	18	1	5	2023-07-05	t
58	20	20	1	2	2023-07-20	t
59	3	1	1	1	2023-07-28	t
60	26	24	1	8	2023-07-15	t
61	9	23	1	4	2023-07-18	t
62	20	14	1	1	2023-07-13	t
63	13	19	1	9	2023-07-03	t
64	27	12	1	6	2023-07-04	t
65	10	2	1	8	2023-07-22	t
66	10	11	1	3	2023-07-06	t
67	22	14	1	3	2023-07-09	t
68	8	15	1	9	2023-07-29	t
69	9	8	1	2	2023-07-08	t
70	27	2	1	10	2023-07-17	t
71	25	3	1	2	2023-07-05	t
72	29	21	1	6	2023-07-03	t
73	2	20	1	8	2023-07-03	t
74	23	20	1	1	2023-07-03	t
75	11	25	1	7	2023-07-06	t
76	8	24	1	1	2023-07-18	t
77	24	8	1	10	2023-07-06	t
78	19	13	1	7	2023-07-17	t
79	18	21	1	4	2023-07-23	t
80	8	3	1	5	2023-07-19	t
81	11	20	1	8	2023-07-22	t
82	7	10	1	2	2023-07-01	t
83	26	7	1	10	2023-07-20	t
84	30	25	1	3	2023-07-12	t
85	3	12	1	4	2023-07-14	t
86	16	7	1	6	2023-07-04	t
87	26	21	1	8	2023-07-01	t
88	20	2	1	8	2023-07-12	t
89	20	24	1	3	2023-07-11	t
90	29	21	1	9	2023-07-04	t
91	18	24	1	5	2023-07-03	t
92	5	8	1	3	2023-07-04	t
93	2	16	1	9	2023-07-12	t
94	26	8	1	10	2023-07-21	t
95	4	25	1	7	2023-07-19	t
96	26	11	1	9	2023-07-19	t
97	19	17	1	5	2023-07-17	t
98	14	9	1	5	2023-07-02	t
99	26	5	1	9	2023-07-09	t
100	8	21	1	9	2023-07-27	t
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.projects (id, title, description, start_date, end_date, status) FROM stdin;
1	Y-Solowarm	Excision of Left Upper Femur, Percutaneous Approach	2022-08-27	2022-10-27	2
2	Andalax	Removal of Infusion Device from Testis, Via Natural or Artificial Opening	2022-09-02	2023-02-02	1
3	Voyatouch	Removal of Internal Fixation Device from Left Radius, Percutaneous Approach	2022-12-27	\N	2
4	Span	Revision of Infusion Device in Penis, Percutaneous Endoscopic Approach	2023-07-24	\N	2
5	Bytecard	Low Dose Rate (LDR) Brachytherapy of Axillary Lymphatics using Iodine 125 (I-125)	2022-11-01	2023-06-01	3
6	Zamit	Replacement of Right Lacrimal Duct with Autologous Tissue Substitute, Via Natural or Artificial Opening Endoscopic	2023-04-13	\N	1
7	Cardguard	Removal of Synthetic Substitute from Abdominal Wall, External Approach	2023-03-21	2023-11-21	1
8	Tin	Measurement of Olfactory Acuity, External Approach	2023-06-20	\N	2
9	Alpha	Bypass Right Hepatic Duct to Common Bile Duct, Open Approach	2022-08-27	\N	2
10	Stim	Supplement Hepatic Artery with Synthetic Substitute, Open Approach	2023-06-25	\N	2
11	Solarbreeze	Beam Radiation of Bladder using Heavy Particles (Protons,Ions)	2023-03-24	2023-05-24	3
12	Zathin	Dilation of Right Lacrimal Duct, Open Approach	2022-07-13	\N	1
13	Latlux	Reposition Left Tibia with Monoplanar External Fixation Device, Open Approach	2022-08-15	\N	1
14	Domainer	Drainage of Bilateral Lungs, Percutaneous Endoscopic Approach	2022-10-20	2023-02-20	1
15	Konklab	Removal of Autologous Tissue Substitute from Right Sacroiliac Joint, Percutaneous Endoscopic Approach	2022-12-24	2023-05-24	2
16	Trippledex	Revision of Nonautologous Tissue Substitute in Left Elbow Joint, External Approach	2022-11-13	\N	1
17	Greenlam	Bypass Abdominal Aorta to Bilateral Renal Artery, Percutaneous Endoscopic Approach	2022-11-12	\N	3
18	Hatity	Supplement Left Nipple with Autologous Tissue Substitute, Percutaneous Approach	2022-12-29	\N	3
19	Asoka	Reposition Lumbosacral Joint, Percutaneous Approach	2022-12-05	2023-08-05	2
20	Matsoft	Dilation of Upper Esophagus with Intraluminal Device, Percutaneous Endoscopic Approach	2022-09-15	2022-12-15	2
21	Matsoft	Bypass Coronary Artery, Three Arteries from Coronary Vein with Intraluminal Device, Percutaneous Approach	2023-01-13	\N	3
22	Aerified	Extirpation of Matter from Stomach, Percutaneous Approach	2023-04-11	2023-07-11	1
23	Zaam-Dox	Change Other Device in Bladder, External Approach	2023-06-23	2023-08-23	3
24	Tres-Zap	Supplement Left Large Intestine with Autologous Tissue Substitute, Via Natural or Artificial Opening	2023-05-16	\N	1
25	Fixflex	Removal of Other Device from Left Upper Extremity, Percutaneous Endoscopic Approach	2022-07-20	2023-03-20	1
26	Fix San	Inspection of Cervical Vertebral Joint, External Approach	2022-10-19	\N	2
27	Aerified	Replacement of Buttock Subcutaneous Tissue and Fascia with Nonautologous Tissue Substitute, Percutaneous Approach	2022-12-22	2023-06-22	2
28	Overhold	Excision of Left Elbow Joint, Percutaneous Endoscopic Approach	2023-01-25	\N	1
29	Overhold	Traction of Right Foot using Traction Apparatus	2022-10-22	\N	1
30	Alpha	Imaging, Upper Arteries, Ultrasonography	2023-02-02	2023-07-02	1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.roles (id, title, access_level) FROM stdin;
1	lead	1
2	developer	2
\.


--
-- Data for Name: task_assignments; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.task_assignments (id, task_id, user_id, assignment_date) FROM stdin;
1	56	9	2023-05-12
4	33	15	2023-05-25
5	28	24	2023-05-17
6	96	7	2023-06-22
8	73	24	2023-03-15
10	18	6	2023-03-22
11	41	10	2023-04-30
13	56	20	2023-02-28
14	36	2	2023-03-10
15	40	8	2023-06-28
16	40	10	2023-06-04
17	57	18	2023-07-05
18	48	16	2023-02-20
19	13	3	2023-06-07
22	61	12	2023-02-10
23	22	8	2023-05-14
25	26	10	2023-06-21
27	87	6	2023-01-31
30	93	1	2023-03-08
31	5	4	2023-06-29
32	10	1	2023-02-17
33	26	4	2023-07-06
35	32	24	2023-05-15
36	91	19	2023-05-27
37	13	2	2023-02-15
38	36	15	2023-06-30
39	78	13	2023-04-16
40	52	22	2023-06-02
41	85	3	2023-06-05
42	20	18	2023-02-25
43	25	7	2023-03-09
44	2	21	2023-01-27
45	18	12	2023-06-01
46	83	19	2023-05-06
47	41	5	2023-03-16
48	7	5	2023-03-28
49	40	25	2023-02-07
50	70	2	2023-04-11
\.


--
-- Data for Name: task_dependencies; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.task_dependencies (task_id, dependent_task_id) FROM stdin;
69	20
6	88
48	47
93	94
97	9
5	21
82	83
35	74
77	59
95	87
42	30
98	58
79	31
76	20
74	92
51	42
43	2
1	37
91	46
38	6
43	33
49	59
16	24
18	94
74	41
90	70
83	58
40	16
42	14
13	3
66	48
94	39
30	21
18	24
37	62
38	10
39	94
44	50
19	94
2	55
91	4
88	33
100	6
10	8
96	85
87	86
79	92
76	32
27	39
21	23
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.tasks (id, title, description, due_date, priority_level, status, completion_date, project_id) FROM stdin;
1	Automated bifurcated workforce	Destruction of Left Superior Parathyroid Gland, Percutaneous Endoscopic Approach	2022-11-23	3	3	2022-12-16	15
2	Business-focused secondary middleware	Bypass Left Ureter to Cutaneous, Open Approach	2022-09-24	1	2	2022-10-24	27
3	Persistent 5th generation budgetary management	Drainage of Cervical Vertebral Disc, Open Approach	2022-12-07	2	3	2022-12-03	29
4	Sharable radical database	Insertion of Pessary into Cul-de-sac, Via Natural or Artificial Opening Endoscopic	2023-01-15	4	3	2023-01-13	24
5	Face to face value-added toolset	Removal of Drainage Device from Left Metacarpocarpal Joint, Open Approach	2023-02-09	2	1	2023-02-16	30
6	Quality-focused neutral frame	Excision of Papillary Muscle, Percutaneous Endoscopic Approach	2023-01-06	3	3	2022-12-14	3
7	Diverse real-time orchestration	Excision of Uterine Supporting Structure, Open Approach, Diagnostic	2023-05-26	4	1	2023-05-09	24
8	User-centric scalable adapter	Occlusion of Right Internal Mammary Artery, Percutaneous Approach	2022-10-14	5	1	2022-11-01	19
9	Multi-layered local artificial intelligence	Replacement of Left Clavicle with Nonautologous Tissue Substitute, Open Approach	2022-12-04	1	2	2022-12-27	2
10	Cross-group dedicated strategy	Change Drainage Device in Right Lung, External Approach	2023-05-31	3	3	2023-05-06	17
11	Customer-focused clear-thinking attitude	Drainage of Trochlear Nerve, Open Approach	2022-11-12	5	1	2022-11-15	2
12	Fully-configurable transitional function	Revision of Drainage Device in Pituitary Gland, Open Approach	2023-07-13	5	1	2023-06-29	13
13	Pre-emptive fresh-thinking core	Transfusion of Autologous Whole Blood into Central Artery, Open Approach	2023-03-15	5	1	2023-02-27	24
14	Stand-alone stable data-warehouse	Occlusion of Right Foot Artery with Intraluminal Device, Open Approach	2023-05-10	1	2	2023-04-17	10
15	Devolved content-based utilisation	Insertion of Infusion Device into Left Thyroid Artery, Open Approach	2022-10-09	5	1	2022-09-22	14
16	Multi-tiered optimal definition	Repair Head and Neck Sympathetic Nerve, Percutaneous Approach	2022-12-04	3	1	2023-01-01	24
17	Seamless next generation initiative	Dilation of Left Radial Artery with Four or More Drug-eluting Intraluminal Devices, Percutaneous Endoscopic Approach	2023-03-03	4	2	2023-02-05	19
18	Progressive empowering contingency	Extirpation of Matter from Left Inguinal Lymphatic, Percutaneous Endoscopic Approach	2023-07-17	3	3	2023-07-18	19
19	Proactive static customer loyalty	Bypass Left Atrium to Left Pulmonary Artery with Nonautologous Tissue Substitute, Percutaneous Endoscopic Approach	2022-10-19	4	1	2022-10-14	21
20	Right-sized responsive knowledge base	Removal of Autologous Tissue Substitute from Female Perineum, Percutaneous Endoscopic Approach	2023-06-20	3	3	2023-07-13	20
21	Advanced incremental ability	Supplement Left Toe Phalanx with Synthetic Substitute, Percutaneous Approach	2023-01-01	1	1	2023-01-17	4
22	Team-oriented dynamic interface	Replacement of Left Internal Carotid Artery with Synthetic Substitute, Open Approach	2023-02-24	4	2	2023-02-19	16
23	Phased system-worthy matrix	Reposition Right Ulna with Intramedullary Internal Fixation Device, Percutaneous Endoscopic Approach	2023-03-16	5	2	2023-04-04	25
24	Adaptive coherent definition	Removal of Radioactive Element from Trunk Subcutaneous Tissue and Fascia, External Approach	2022-10-27	1	1	2022-09-27	2
25	Synergized static infrastructure	Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute, Open Approach	2023-04-04	3	2	2023-04-21	9
26	Mandatory intermediate leverage	Insertion of Intramedullary Internal Fixation Device into Left Humeral Shaft, Open Approach	2022-10-18	2	3	2022-11-12	7
27	Expanded responsive paradigm	Revision of Zooplastic Tissue in Tricuspid Valve, Open Approach	2023-04-16	1	2	2023-04-24	17
28	User-friendly leading edge knowledge base	Reposition Left Basilic Vein, Percutaneous Endoscopic Approach	2023-06-30	5	1	2023-06-12	19
29	Automated user-facing moderator	Supplement Right Abdomen Tendon with Autologous Tissue Substitute, Open Approach	2022-12-15	5	2	2022-11-24	20
30	Synchronised foreground encoding	Replacement of Right Colic Artery with Autologous Tissue Substitute, Percutaneous Endoscopic Approach	2022-09-23	3	3	2022-10-20	19
31	Self-enabling zero defect installation	Destruction of Right Neck Muscle, Percutaneous Approach	2022-11-04	3	3	2022-11-28	16
32	Assimilated optimal website	Bathing/Showering Techniques Treatment	2023-02-13	1	3	2023-02-02	26
33	Balanced needs-based frame	Excision of Urethra, Percutaneous Approach, Diagnostic	2022-12-16	3	1	2022-11-19	28
34	Profound heuristic definition	Repair Coronary Vein, Open Approach	2022-09-29	1	3	2022-09-01	16
35	User-centric attitude-oriented framework	Repair Right Greater Saphenous Vein, Open Approach	2023-06-12	5	1	2023-07-04	13
36	Decentralized exuding secured line	Bypass Ileum to Cutaneous with Synthetic Substitute, Open Approach	2023-06-13	4	2	2023-06-18	6
37	Persistent heuristic website	Destruction of Left Main Bronchus, Via Natural or Artificial Opening	2023-04-18	5	3	2023-04-20	4
38	De-engineered system-worthy database	Insertion of Feeding Device into Jejunum, Percutaneous Approach	2022-12-16	1	1	2022-12-25	7
39	Persistent composite project	Insertion of Single Array Rechargeable Stimulator Generator into Back Subcutaneous Tissue and Fascia, Open Approach	2022-11-10	1	1	2022-12-05	6
40	Customer-focused zero defect archive	Drainage of Nasal Septum, Open Approach	2022-10-26	3	3	2022-10-24	30
41	Down-sized executive internet solution	Occlusion of Face Artery with Extraluminal Device, Percutaneous Endoscopic Approach	2023-03-14	4	3	2023-04-10	27
42	Digitized content-based utilisation	Restriction of Right Axillary Lymphatic, Percutaneous Approach	2023-03-19	1	1	2023-04-08	14
43	Self-enabling disintermediate process improvement	Insertion of Monitoring Device into Spinal Cord, Percutaneous Endoscopic Approach	2022-09-25	3	3	2022-09-01	6
44	Virtual 4th generation solution	Revision of Nonautologous Tissue Substitute in Left Wrist Joint, External Approach	2023-02-26	5	2	2023-03-08	6
45	Up-sized didactic collaboration	Fluoroscopy of Abdomen and Pelvis using High Osmolar Contrast	2022-12-15	3	2	2022-11-20	23
46	Compatible demand-driven strategy	Excision of Left Extraocular Muscle, Percutaneous Approach, Diagnostic	2023-01-15	3	1	2022-12-18	3
47	Visionary maximized ability	Excision of Left Lower Lung Lobe, Open Approach	2022-12-11	2	3	2022-12-02	15
48	Multi-layered context-sensitive knowledge base	Occlusion of Portal Vein, Percutaneous Approach	2022-12-12	3	3	2022-12-02	13
49	Front-line 3rd generation Graphic Interface	Removal of Intraluminal Device from Right Ear, Percutaneous Approach	2023-03-23	3	2	2023-04-07	24
50	User-centric maximized matrix	Revision of Drainage Device in Trachea, Open Approach	2023-03-12	5	2	2023-03-09	29
51	Profit-focused value-added time-frame	Wheelchair Mobility Assessment using Assistive, Adaptive, Supportive or Protective Equipment	2023-05-10	4	2	2023-05-28	13
52	Horizontal maximized matrices	Excision of Right Basilic Vein, Percutaneous Approach	2022-10-01	3	1	2022-09-05	13
53	Persevering radical process improvement	Repair Cervix, Via Natural or Artificial Opening Endoscopic	2022-12-17	4	2	2023-01-08	15
54	Devolved 5th generation instruction set	Replacement of Right Patella with Synthetic Substitute, Percutaneous Endoscopic Approach	2023-01-17	1	3	2023-01-17	20
55	Customizable grid-enabled help-desk	Occlusion of Left Atrial Appendage with Intraluminal Device, Percutaneous Endoscopic Approach	2023-06-22	4	3	2023-06-05	15
56	Open-architected even-keeled forecast	Fluoroscopy of Right Kidney using Low Osmolar Contrast	2023-07-13	4	2	2023-07-06	9
57	Seamless intangible info-mediaries	Transplantation of Left Lower Lung Lobe, Zooplastic, Open Approach	2023-06-07	5	3	2023-06-16	4
58	Seamless system-worthy internet solution	Drainage of Left Trunk Muscle with Drainage Device, Open Approach	2023-02-10	5	2	2023-01-29	18
59	Horizontal bandwidth-monitored complexity	Change Nasal Packing Material	2023-05-03	5	1	2023-05-27	17
60	Versatile exuding installation	Change Pressure Dressing on Left Upper Arm	2023-02-26	1	1	2023-02-05	21
61	Decentralized intangible info-mediaries	Drainage of Left Clavicle with Drainage Device, Open Approach	2023-01-25	3	1	2023-01-08	16
62	Fully-configurable logistical array	Replacement of Soft Palate with Autologous Tissue Substitute, External Approach	2023-04-21	1	3	2023-04-11	5
63	Progressive dedicated infrastructure	Dilation of Right Femoral Artery with Three Drug-eluting Intraluminal Devices, Open Approach	2023-05-20	5	2	2023-05-30	3
64	Polarised maximized internet solution	Repair Prostate, Percutaneous Approach	2023-03-22	5	2	2023-03-13	6
65	Persevering discrete info-mediaries	Extirpation of Matter from Oculomotor Nerve, Open Approach	2023-04-03	3	3	2023-04-07	13
66	Customer-focused local core	Extraction of Lumbar Sympathetic Nerve, Percutaneous Endoscopic Approach	2022-09-23	3	3	2022-09-18	20
67	Horizontal hybrid flexibility	Supplement Right Main Bronchus with Synthetic Substitute, Open Approach	2022-10-07	3	3	2022-10-18	25
68	Profit-focused uniform hub	Control Bleeding in Left Elbow Region, Open Approach	2023-01-02	3	3	2023-01-04	5
69	Extended zero tolerance challenge	Insertion of Other Device into Right Femoral Region, Open Approach	2022-11-24	4	2	2022-10-28	19
70	Synergistic interactive model	Transfer Perineum Bursa and Ligament, Open Approach	2023-04-26	4	1	2023-04-15	25
71	Self-enabling encompassing info-mediaries	Removal of Radioactive Element from Right Upper Extremity, External Approach	2022-12-15	3	2	2022-11-23	4
72	Proactive holistic monitoring	Bypass Right Ureter to Ileum with Autologous Tissue Substitute, Percutaneous Endoscopic Approach	2023-04-17	4	1	2023-05-04	3
73	Synergistic upward-trending Graphic Interface	Revision of Synthetic Substitute in Prostate and Seminal Vesicles, External Approach	2023-05-01	1	1	2023-04-07	15
74	Face to face multimedia model	Reposition Right Thumb Phalanx, External Approach	2023-03-02	4	3	2023-02-11	7
75	Assimilated uniform moratorium	Fluoroscopy of Bilateral Lungs	2023-07-08	5	2	2023-06-20	8
76	Profound content-based intranet	Transfer Facial Nerve to Acoustic Nerve, Open Approach	2023-07-11	2	3	2023-08-04	10
77	Centralized didactic secured line	Revision of Autologous Tissue Substitute in Left Metatarsal, Percutaneous Approach	2022-10-22	4	3	2022-11-09	30
78	Balanced zero tolerance methodology	Extirpation of Matter from Right Ureter, Via Natural or Artificial Opening	2022-11-15	2	1	2022-10-25	7
79	Reactive transitional budgetary management	Resection of Left Fallopian Tube, Via Natural or Artificial Opening Endoscopic	2023-06-21	1	2	2023-06-27	11
80	Phased homogeneous toolset	Supplement Right Occipital Bone with Synthetic Substitute, Percutaneous Approach	2022-12-31	4	1	2023-01-09	5
81	Expanded non-volatile forecast	Traction of Right Finger using Traction Apparatus	2023-02-20	5	2	2023-02-14	10
82	De-engineered holistic array	Extraction of Left Maxillary Sinus, Percutaneous Approach	2023-07-01	1	3	2023-07-05	13
83	Horizontal background moderator	Excision of Left Ovary, Via Natural or Artificial Opening Endoscopic, Diagnostic	2023-06-19	4	3	2023-07-05	6
84	Seamless next generation productivity	Reposition Right Toe Phalangeal Joint, Open Approach	2023-05-09	3	3	2023-04-19	13
85	Open-architected incremental function	Reposition Right Tibia with External Fixation Device, Open Approach	2023-04-26	5	2	2023-05-12	22
86	Cloned eco-centric hardware	Excision of Left Cephalic Vein, Open Approach, Diagnostic	2022-10-08	5	1	2022-10-20	26
87	Diverse dedicated pricing structure	Drainage of Left Thyroid Gland Lobe, Percutaneous Approach, Diagnostic	2023-07-02	1	3	2023-07-15	29
88	Customer-focused motivating interface	Revision of Synthetic Substitute in Left Upper Femur, Percutaneous Endoscopic Approach	2023-06-14	4	1	2023-06-12	24
89	Fully-configurable systemic hub	Destruction of Left Upper Eyelid, Percutaneous Approach	2022-11-20	2	3	2022-12-20	12
90	Front-line 24/7 hierarchy	Transfer Vagus Nerve to Vagus Nerve, Percutaneous Endoscopic Approach	2022-10-16	2	1	2022-10-24	27
91	Phased grid-enabled projection	Fragmentation in Bilateral Fallopian Tubes, Via Natural or Artificial Opening	2023-04-06	4	3	2023-03-14	4
92	Universal directional archive	Restriction of Gastric Vein with Extraluminal Device, Open Approach	2023-01-28	1	1	2023-02-20	26
93	Optional asymmetric parallelism	Revision of Autologous Tissue Substitute in Left Ankle Joint, Percutaneous Endoscopic Approach	2023-02-10	4	3	2023-01-16	29
94	Reverse-engineered tertiary instruction set	Removal of Synthetic Substitute from Right Metatarsal-Tarsal Joint, Percutaneous Endoscopic Approach	2022-11-26	5	2	2022-11-09	10
95	Visionary encompassing benchmark	Repair Left Femoral Shaft, Percutaneous Approach	2022-11-29	5	1	2022-11-19	7
96	Enhanced multimedia time-frame	Occlusion of Right External Carotid Artery with Extraluminal Device, Percutaneous Approach	2023-03-23	1	1	2023-03-10	5
97	Advanced next generation benchmark	Removal of Autologous Tissue Substitute from Right Carpal, Percutaneous Endoscopic Approach	2022-12-25	4	1	2022-12-01	26
98	Universal exuding software	Drainage of Left Foot Artery, Percutaneous Approach	2023-06-12	2	2	2023-06-28	3
99	Adaptive disintermediate system engine	Revision of Infusion Pump in Lower Extremity Subcutaneous Tissue and Fascia, Open Approach	2023-05-09	5	2	2023-05-30	22
100	Future-proofed human-resource open system	Extirpation of Matter from Peritoneal Cavity, Percutaneous Approach	2023-05-16	4	3	2023-05-19	13
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.user_profiles (id, title, description) FROM stdin;
1	Teacher	Parent-child estrangement NEC
2	Senior Editor	Gastric contents in other parts of respiratory tract causing other injury, subsequent encounter
3	Sales Associate	Maternal care for abnormality of pelvic organs
4	Biostatistician II	Passenger in heavy transport vehicle injured in collision with other nonmotor vehicle in nontraffic accident
5	Payment Adjustment Coordinator	Unspecified subluxation of left shoulder joint, subsequent encounter
6	Nuclear Power Engineer	Puncture wound without foreign body of left thumb without damage to nail
7	Mechanical Systems Engineer	Epicranial subaponeurotic hemorrhage due to birth injury
8	Pharmacist	Nondisplaced fracture (avulsion) of lateral epicondyle of unspecified humerus, subsequent encounter for fracture with nonunion
9	Payment Adjustment Coordinator	Corrosion of first degree of back of left hand, sequela
10	Structural Engineer	Anisometropia and aniseikonia
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.users (id, first_name, last_name, email, mobile_number, is_admin, password, password_reset_token) FROM stdin;
1	Walt	Menhci	user1@project.com	9598914245	f	hG0(ZdjL%\\'g"	$2a$04$u8/zERyHEasHxTxB1LVlXuwUnLr6ZhkjVfwEBajqufxpxg4DHqfU.
2	Kelvin	Nannizzi	user2@project.com	9051487392	f	hO0/WNK%	$2a$04$B0iaaTg1FbNq6vkopS/kAuHMJ/LqPzedgNnJAyQay.ppCfIwYc9WW
3	Boy	Duchan	user3@project.com	4813457552	f	uN9.SPvr+R#8\\D/@	$2a$04$YjJwsc7TMVxw2Gs4iX8ycel4zUqQELjeEx10ptTTR4obOkixquiM.
4	Huntington	Drynan	user4@project.com	2203613504	f	xE4*}KJSYy)Nq34	$2a$04$HcbrWEXw1Bv1KqJBiyQX1efxB4RuZGHZCinaNsVP5N0t8Suf.VZrW
5	Hakeem	Portman	user5@project.com	9812031752	f	kT8!%YwQ	$2a$04$6i3PSjSMKa6v9qdhY05F0e/xH5VYSaztsOoVYJBzNtQ88snJsLDwe
6	De witt	Allmark	user6@project.com	8297866068	f	cY5<fL\\leb|@4'd	$2a$04$vy8j3WmJjLGOPDLVel7CvOMH9H3oGnRYVQ3VTtScWqe3K78JirNOm
7	Brendan	Hoogendorp	user7@project.com	1412353242	f	iE2,!08Cg	$2a$04$0eCaY1XtjemtdHzSWGmtmeaPEgSGYpyVCfPttCtDtPHJ.fgALVlCC
8	Jody	Mellanby	user8@project.com	2093165710	f	yB9++668C(DzvYg	$2a$04$LndBbP2xH7G6q5S3cmaf7eebCoAfvbgkiOBdJb9b9CGCa/Pzg96NW
9	Torey	Winwood	user9@project.com	6404597658	f	gH6@k2NIe	$2a$04$BfZlftuDpQxlf59I3Fna3e0l8aeSFzXZIneJnTygWeB5CBKw4C1D6
10	Jehu	Hainsworth	user10@project.com	5981604527	f	nS4\\0/FJ'Qg%~=	$2a$04$CP897dGF10B/UqTSRleOeOonFZeaxmCB4K.SXW4uPfz86.q74BE.m
11	Francklyn	Hebard	user11@project.com	2824233042	f	uN5\\~{w`nS1VV%(=	$2a$04$V1V5RCfTQ0bXWj0y6ZzZH.ruAMZTG/AlRzlv0zlZHu.o0Th.O8lda
12	Lanie	Lethbrig	user12@project.com	8596255249	f	iK6,)I>6#jmB&v$.	$2a$04$YgDNCYHdBwZaxIA8Km/ENeDKX2ZtFQ8uQ.yJyYbr9ZXJ/SnNfSm.S
13	Hobey	Luty	user13@project.com	2641066767	f	uK5$lFH%	$2a$04$UEoxiRgmO.6eyU9X0qkmuOfG6IFbdXc5mc/l.Ly.BxG4Ki2Lr.rW2
14	Karim	Lazarus	user14@project.com	3609630805	f	cM2!/3To\\BKJ$R&E	$2a$04$4RuMT27cEuJCHUhrseQ/b.gqu/5.wqEnCWNlZydxyeFJWZaWWa38m
15	Earlie	Hambidge	user15@project.com	9892742494	f	hA3*%M/V)G6cNMv	$2a$04$3DydvR2TYh/Jj9ymIefxHu/OWugzS5YqHCscujniYaCnZfegB1tj.
16	Bogey	Borgne	user16@project.com	1924962314	f	cU0\\U.'5K6qoMO	$2a$04$1s2ZDTklf2LGsmguKzp3cOnzZASGMAxHRVQNNE3DfmNeRCeL9F3BO
17	Kingsley	Gerrard	user17@project.com	9007897336	f	rT0<M=\\T"H5I4	$2a$04$OWSX5b2AqwK49LSL99IRVuH.NLKfW5bb.rHPlUhvhre16ZGbBLYDe
18	Corey	McKee	user18@project.com	7043266139	f	sV6_n6JmY	$2a$04$b7BapMmW78kvComWUmtwNOwK/YboEXDVMpaGMiYYwOiszybe4F8mG
19	Gerrard	Brinded	user19@project.com	6725673864	f	gR0',IO~O{6f	$2a$04$rkDlj7hcD0sxN4ED3pnytOS4tMtKmfzv.TquTepYUOUmvFSE0He0i
20	Bertrando	Birtley	user20@project.com	5028898565	f	nJ4"A(7,GL3c$Vqr	$2a$04$7F7663tzirXmxaOVshnjQO3DnrJhzk9EF8xFMVjNRKwfihnR485BW
21	Budd	Govett	user21@project.com	9593331974	f	dX2{.q9nKXcbOZN0	$2a$04$TY5DCH/ysWkHlI.23fW2fONlF4bRlnJT0k9/t/8Xfi9CY543k10Ii
22	Errick	Hurton	user22@project.com	6198850030	f	bD2/F"Eidf	$2a$04$BuZW.sg0bMobuaALfqjkUe6wB3tyWsDdjG0UJsxnBDW3P8Tu9htD2
23	Whitney	Whitlam	user23@project.com	5221802458	f	oV1}>l4y)EYV	$2a$04$Wom9oITeYiEmly/O8inLleokfdtyWHHElTZh9.F06eYEdIujateWW
24	Noll	Haggerwood	user24@project.com	3449422883	f	pW5\\jPpSLtlB	$2a$04$bux2/2kftH7bz2hxunR86OFl1OE04REX//RWZcDkZJclKldf.KEwq
25	Benedikt	Maun	user25@project.com	4451632616	f	uT1(mbtlgu	$2a$04$i7.FVmjO.x.Ay1UsQWgW1OI6G2Mx2tOXny9bFa0slzmqCqSCpXKwC
\.


--
-- Name: issue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.issue_id_seq', 1, false);


--
-- Name: project_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.project_documents_id_seq', 1, false);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.project_id_seq', 1, false);


--
-- Name: project_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.project_users_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: task_assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.task_assignments_id_seq', 1, false);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.task_id_seq', 1, false);


--
-- Name: user_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.user_profiles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: issues issue_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issue_pkey PRIMARY KEY (id);


--
-- Name: project_documents project_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT project_documents_pkey PRIMARY KEY (id);


--
-- Name: projects project_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: project_users project_users_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_pkey PRIMARY KEY (id);


--
-- Name: roles role_access_level_key; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT role_access_level_key UNIQUE (access_level);


--
-- Name: roles role_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: task_assignments task_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_pkey PRIMARY KEY (id);


--
-- Name: tasks task_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: issues issue_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issue_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id);


--
-- Name: issues issue_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issue_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: issues issue_reported_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issue_reported_by_fkey FOREIGN KEY (reported_by) REFERENCES public.users(id);


--
-- Name: project_documents project_documents_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT project_documents_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_documents project_documents_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT project_documents_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: project_users project_users_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.user_profiles(id);


--
-- Name: project_users project_users_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_users project_users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: project_users project_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: task_assignments task_assignments_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: task_assignments task_assignments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignments
    ADD CONSTRAINT task_assignments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: task_dependencies task_dependencies_dependent_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependencies
    ADD CONSTRAINT task_dependencies_dependent_task_id_fkey FOREIGN KEY (dependent_task_id) REFERENCES public.tasks(id);


--
-- Name: task_dependencies task_dependencies_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependencies
    ADD CONSTRAINT task_dependencies_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: tasks task_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT task_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- PostgreSQL database dump complete
--

