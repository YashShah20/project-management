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
-- Name: attachment; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.attachment (
    attachmentid integer NOT NULL,
    issueid integer NOT NULL,
    filename text NOT NULL,
    filepath text,
    uploadedbyuserid integer NOT NULL,
    createdat timestamp without time zone
);


ALTER TABLE public.attachment OWNER TO yash;

--
-- Name: attachment_attachmentid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.attachment_attachmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attachment_attachmentid_seq OWNER TO yash;

--
-- Name: attachment_attachmentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.attachment_attachmentid_seq OWNED BY public.attachment.attachmentid;


--
-- Name: chat_room; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.chat_room (
    roomid integer NOT NULL,
    roomname text NOT NULL,
    roomtype integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.chat_room OWNER TO yash;

--
-- Name: chat_room_roomid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.chat_room_roomid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_room_roomid_seq OWNER TO yash;

--
-- Name: chat_room_roomid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.chat_room_roomid_seq OWNED BY public.chat_room.roomid;


--
-- Name: chat_room_users; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.chat_room_users (
    userid integer NOT NULL,
    roomid integer NOT NULL,
    role integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.chat_room_users OWNER TO yash;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.comment (
    commentid integer NOT NULL,
    issueid integer NOT NULL,
    userid integer NOT NULL,
    commenttext text NOT NULL,
    createdat timestamp without time zone
);


ALTER TABLE public.comment OWNER TO yash;

--
-- Name: comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.comment_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_commentid_seq OWNER TO yash;

--
-- Name: comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.comment_commentid_seq OWNED BY public.comment.commentid;


--
-- Name: issue; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.issue (
    issueid integer NOT NULL,
    projectid integer NOT NULL,
    issuetitle text NOT NULL,
    description text NOT NULL,
    issuetype integer NOT NULL,
    priority integer,
    status integer,
    assigneeuserid integer,
    reporteruserid integer NOT NULL,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.issue OWNER TO yash;

--
-- Name: issue_issueid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.issue_issueid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issue_issueid_seq OWNER TO yash;

--
-- Name: issue_issueid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.issue_issueid_seq OWNED BY public.issue.issueid;


--
-- Name: log; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.log (
    logid integer NOT NULL,
    userid integer NOT NULL,
    action text,
    description text,
    oldvalue text,
    newvalue text,
    createdat timestamp without time zone
);


ALTER TABLE public.log OWNER TO yash;

--
-- Name: log_logid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.log_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_logid_seq OWNER TO yash;

--
-- Name: log_logid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.log_logid_seq OWNED BY public.log.logid;


--
-- Name: message; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.message (
    messageid integer NOT NULL,
    roomid integer NOT NULL,
    userid integer NOT NULL,
    messagetext text NOT NULL,
    createdat timestamp without time zone
);


ALTER TABLE public.message OWNER TO yash;

--
-- Name: message_messageid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.message_messageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_messageid_seq OWNER TO yash;

--
-- Name: message_messageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.message_messageid_seq OWNED BY public.message.messageid;


--
-- Name: milestone; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.milestone (
    milestoneid integer NOT NULL,
    projectid integer,
    milestonename text,
    duedate date,
    description text,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.milestone OWNER TO yash;

--
-- Name: milestone_milestoneid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.milestone_milestoneid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.milestone_milestoneid_seq OWNER TO yash;

--
-- Name: milestone_milestoneid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.milestone_milestoneid_seq OWNED BY public.milestone.milestoneid;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.notification (
    notificationid integer NOT NULL,
    userid integer NOT NULL,
    message text NOT NULL,
    category text,
    createdat timestamp without time zone,
    isread boolean DEFAULT false
);


ALTER TABLE public.notification OWNER TO yash;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.notification_notificationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_notificationid_seq OWNER TO yash;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.notification_notificationid_seq OWNED BY public.notification.notificationid;


--
-- Name: project; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.project (
    projectid integer NOT NULL,
    projectname text NOT NULL,
    description text NOT NULL,
    startdate date NOT NULL,
    enddate date,
    status integer,
    leaduserid integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.project OWNER TO yash;

--
-- Name: project_documents; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.project_documents (
    documentid integer NOT NULL,
    projectid integer NOT NULL,
    documentname text NOT NULL,
    documentpath text,
    uploadedbyuserid integer,
    uploaddate timestamp without time zone
);


ALTER TABLE public.project_documents OWNER TO yash;

--
-- Name: project_documents_documentid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.project_documents_documentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_documents_documentid_seq OWNER TO yash;

--
-- Name: project_documents_documentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.project_documents_documentid_seq OWNED BY public.project_documents.documentid;


--
-- Name: project_projectid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.project_projectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_projectid_seq OWNER TO yash;

--
-- Name: project_projectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.project_projectid_seq OWNED BY public.project.projectid;


--
-- Name: project_users; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.project_users (
    projectid integer NOT NULL,
    userid integer NOT NULL,
    roleid integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.project_users OWNER TO yash;

--
-- Name: review; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.review (
    reviewid integer NOT NULL,
    taskid integer NOT NULL,
    userid integer NOT NULL,
    description text NOT NULL,
    rating numeric,
    starttime timestamp without time zone,
    endtime timestamp without time zone,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.review OWNER TO yash;

--
-- Name: review_reviewid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.review_reviewid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_reviewid_seq OWNER TO yash;

--
-- Name: review_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.review_reviewid_seq OWNED BY public.review.reviewid;


--
-- Name: role; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.role (
    roleid integer NOT NULL,
    rolename text NOT NULL,
    roledescription text NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.role OWNER TO yash;

--
-- Name: role_roleid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.role_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_roleid_seq OWNER TO yash;

--
-- Name: role_roleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.role_roleid_seq OWNED BY public.role.roleid;


--
-- Name: sprint; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.sprint (
    sprintid integer NOT NULL,
    projectid integer NOT NULL,
    sprinttitle text NOT NULL,
    description text NOT NULL,
    startdate date NOT NULL,
    enddate date,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.sprint OWNER TO yash;

--
-- Name: sprint_sprintid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.sprint_sprintid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sprint_sprintid_seq OWNER TO yash;

--
-- Name: sprint_sprintid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.sprint_sprintid_seq OWNED BY public.sprint.sprintid;


--
-- Name: sprint_tasks; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.sprint_tasks (
    sprintid integer NOT NULL,
    taskid integer NOT NULL
);


ALTER TABLE public.sprint_tasks OWNER TO yash;

--
-- Name: sprint_tasks_sprintid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.sprint_tasks_sprintid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sprint_tasks_sprintid_seq OWNER TO yash;

--
-- Name: sprint_tasks_sprintid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.sprint_tasks_sprintid_seq OWNED BY public.sprint_tasks.sprintid;


--
-- Name: task; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.task (
    taskid integer NOT NULL,
    projectid integer NOT NULL,
    taskname text NOT NULL,
    description text NOT NULL,
    startdate date NOT NULL,
    enddate date,
    status integer,
    assignedtouserid integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.task OWNER TO yash;

--
-- Name: task_assignment; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.task_assignment (
    assignmentid integer NOT NULL,
    taskid integer,
    userid integer,
    assignedstartdate date,
    assignedenddate date
);


ALTER TABLE public.task_assignment OWNER TO yash;

--
-- Name: task_assignment_assignmentid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.task_assignment_assignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_assignment_assignmentid_seq OWNER TO yash;

--
-- Name: task_assignment_assignmentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.task_assignment_assignmentid_seq OWNED BY public.task_assignment.assignmentid;


--
-- Name: task_dependency; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.task_dependency (
    dependencyid integer NOT NULL,
    taskid integer NOT NULL,
    dependenttaskid integer NOT NULL
);


ALTER TABLE public.task_dependency OWNER TO yash;

--
-- Name: task_dependency_dependencyid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.task_dependency_dependencyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_dependency_dependencyid_seq OWNER TO yash;

--
-- Name: task_dependency_dependencyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.task_dependency_dependencyid_seq OWNED BY public.task_dependency.dependencyid;


--
-- Name: task_taskid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.task_taskid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_taskid_seq OWNER TO yash;

--
-- Name: task_taskid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.task_taskid_seq OWNED BY public.task.taskid;


--
-- Name: team; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.team (
    teamid integer NOT NULL,
    teamname text NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.team OWNER TO yash;

--
-- Name: team_members; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.team_members (
    teamid integer NOT NULL,
    userid integer NOT NULL,
    createdby integer,
    createdat timestamp without time zone,
    lastmodifiedby integer,
    lastmodifiedat timestamp without time zone
);


ALTER TABLE public.team_members OWNER TO yash;

--
-- Name: team_teamid_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public.team_teamid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_teamid_seq OWNER TO yash;

--
-- Name: team_teamid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public.team_teamid_seq OWNED BY public.team.teamid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: yash
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text,
    "userName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdBy" integer,
    "createdAt" timestamp without time zone,
    "lastModifiedBy" integer,
    "lastModifiedAt" timestamp without time zone
);


ALTER TABLE public.users OWNER TO yash;

--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: yash
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users_userId_seq" OWNER TO yash;

--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yash
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: attachment attachmentid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.attachment ALTER COLUMN attachmentid SET DEFAULT nextval('public.attachment_attachmentid_seq'::regclass);


--
-- Name: chat_room roomid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.chat_room ALTER COLUMN roomid SET DEFAULT nextval('public.chat_room_roomid_seq'::regclass);


--
-- Name: comment commentid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.comment ALTER COLUMN commentid SET DEFAULT nextval('public.comment_commentid_seq'::regclass);


--
-- Name: issue issueid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issue ALTER COLUMN issueid SET DEFAULT nextval('public.issue_issueid_seq'::regclass);


--
-- Name: log logid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.log ALTER COLUMN logid SET DEFAULT nextval('public.log_logid_seq'::regclass);


--
-- Name: message messageid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.message ALTER COLUMN messageid SET DEFAULT nextval('public.message_messageid_seq'::regclass);


--
-- Name: milestone milestoneid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.milestone ALTER COLUMN milestoneid SET DEFAULT nextval('public.milestone_milestoneid_seq'::regclass);


--
-- Name: notification notificationid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.notification ALTER COLUMN notificationid SET DEFAULT nextval('public.notification_notificationid_seq'::regclass);


--
-- Name: project projectid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project ALTER COLUMN projectid SET DEFAULT nextval('public.project_projectid_seq'::regclass);


--
-- Name: project_documents documentid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents ALTER COLUMN documentid SET DEFAULT nextval('public.project_documents_documentid_seq'::regclass);


--
-- Name: review reviewid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.review ALTER COLUMN reviewid SET DEFAULT nextval('public.review_reviewid_seq'::regclass);


--
-- Name: role roleid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.role ALTER COLUMN roleid SET DEFAULT nextval('public.role_roleid_seq'::regclass);


--
-- Name: sprint sprintid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint ALTER COLUMN sprintid SET DEFAULT nextval('public.sprint_sprintid_seq'::regclass);


--
-- Name: sprint_tasks sprintid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint_tasks ALTER COLUMN sprintid SET DEFAULT nextval('public.sprint_tasks_sprintid_seq'::regclass);


--
-- Name: task taskid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task ALTER COLUMN taskid SET DEFAULT nextval('public.task_taskid_seq'::regclass);


--
-- Name: task_assignment assignmentid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignment ALTER COLUMN assignmentid SET DEFAULT nextval('public.task_assignment_assignmentid_seq'::regclass);


--
-- Name: task_dependency dependencyid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependency ALTER COLUMN dependencyid SET DEFAULT nextval('public.task_dependency_dependencyid_seq'::regclass);


--
-- Name: team teamid; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.team ALTER COLUMN teamid SET DEFAULT nextval('public.team_teamid_seq'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.attachment (attachmentid, issueid, filename, filepath, uploadedbyuserid, createdat) FROM stdin;
\.


--
-- Data for Name: chat_room; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.chat_room (roomid, roomname, roomtype, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: chat_room_users; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.chat_room_users (userid, roomid, role, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.comment (commentid, issueid, userid, commenttext, createdat) FROM stdin;
\.


--
-- Data for Name: issue; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.issue (issueid, projectid, issuetitle, description, issuetype, priority, status, assigneeuserid, reporteruserid, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.log (logid, userid, action, description, oldvalue, newvalue, createdat) FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.message (messageid, roomid, userid, messagetext, createdat) FROM stdin;
\.


--
-- Data for Name: milestone; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.milestone (milestoneid, projectid, milestonename, duedate, description, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.notification (notificationid, userid, message, category, createdat, isread) FROM stdin;
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.project (projectid, projectname, description, startdate, enddate, status, leaduserid, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: project_documents; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.project_documents (documentid, projectid, documentname, documentpath, uploadedbyuserid, uploaddate) FROM stdin;
\.


--
-- Data for Name: project_users; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.project_users (projectid, userid, roleid, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.review (reviewid, taskid, userid, description, rating, starttime, endtime, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.role (roleid, rolename, roledescription, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: sprint; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.sprint (sprintid, projectid, sprinttitle, description, startdate, enddate, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: sprint_tasks; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.sprint_tasks (sprintid, taskid) FROM stdin;
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.task (taskid, projectid, taskname, description, startdate, enddate, status, assignedtouserid, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: task_assignment; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.task_assignment (assignmentid, taskid, userid, assignedstartdate, assignedenddate) FROM stdin;
\.


--
-- Data for Name: task_dependency; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.task_dependency (dependencyid, taskid, dependenttaskid) FROM stdin;
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.team (teamid, teamname, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.team_members (teamid, userid, createdby, createdat, lastmodifiedby, lastmodifiedat) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yash
--

COPY public.users ("userId", "firstName", "lastName", "userName", email, password, "createdBy", "createdAt", "lastModifiedBy", "lastModifiedAt") FROM stdin;
\.


--
-- Name: attachment_attachmentid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.attachment_attachmentid_seq', 1, false);


--
-- Name: chat_room_roomid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.chat_room_roomid_seq', 1, false);


--
-- Name: comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.comment_commentid_seq', 1, false);


--
-- Name: issue_issueid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.issue_issueid_seq', 1, false);


--
-- Name: log_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.log_logid_seq', 1, false);


--
-- Name: message_messageid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.message_messageid_seq', 1, false);


--
-- Name: milestone_milestoneid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.milestone_milestoneid_seq', 1, false);


--
-- Name: notification_notificationid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.notification_notificationid_seq', 1, false);


--
-- Name: project_documents_documentid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.project_documents_documentid_seq', 1, false);


--
-- Name: project_projectid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.project_projectid_seq', 1, false);


--
-- Name: review_reviewid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.review_reviewid_seq', 1, false);


--
-- Name: role_roleid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.role_roleid_seq', 1, false);


--
-- Name: sprint_sprintid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.sprint_sprintid_seq', 1, false);


--
-- Name: sprint_tasks_sprintid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.sprint_tasks_sprintid_seq', 1, false);


--
-- Name: task_assignment_assignmentid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.task_assignment_assignmentid_seq', 1, false);


--
-- Name: task_dependency_dependencyid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.task_dependency_dependencyid_seq', 1, false);


--
-- Name: task_taskid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.task_taskid_seq', 1, false);


--
-- Name: team_teamid_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public.team_teamid_seq', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: yash
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (attachmentid);


--
-- Name: chat_room chat_room_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.chat_room
    ADD CONSTRAINT chat_room_pkey PRIMARY KEY (roomid);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);


--
-- Name: issue issue_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issue
    ADD CONSTRAINT issue_pkey PRIMARY KEY (issueid);


--
-- Name: log log_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (logid);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (messageid);


--
-- Name: milestone milestone_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.milestone
    ADD CONSTRAINT milestone_pkey PRIMARY KEY (milestoneid);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notificationid);


--
-- Name: project_documents project_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT project_documents_pkey PRIMARY KEY (documentid);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (projectid);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (roleid);


--
-- Name: sprint sprint_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT sprint_pkey PRIMARY KEY (sprintid);


--
-- Name: sprint_tasks sprint_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint_tasks
    ADD CONSTRAINT sprint_tasks_pkey PRIMARY KEY (sprintid);


--
-- Name: task_assignment task_assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_assignment
    ADD CONSTRAINT task_assignment_pkey PRIMARY KEY (assignmentid);


--
-- Name: task_dependency task_dependency_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependency
    ADD CONSTRAINT task_dependency_pkey PRIMARY KEY (dependencyid);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (taskid);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (teamid);


--
-- Name: project_users uniq_project_user; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT uniq_project_user UNIQUE (projectid, userid);


--
-- Name: sprint_tasks uniq_sprint_task; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint_tasks
    ADD CONSTRAINT uniq_sprint_task UNIQUE (sprintid, taskid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: attachment fk_attachment_issue; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT fk_attachment_issue FOREIGN KEY (issueid) REFERENCES public.issue(issueid) NOT VALID;


--
-- Name: attachment fk_attachment_uploaded_by; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT fk_attachment_uploaded_by FOREIGN KEY (uploadedbyuserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: chat_room_users fk_chat_room_id; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.chat_room_users
    ADD CONSTRAINT fk_chat_room_id FOREIGN KEY (roomid) REFERENCES public.chat_room(roomid) NOT VALID;


--
-- Name: chat_room fk_chat_room_owner; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.chat_room
    ADD CONSTRAINT fk_chat_room_owner FOREIGN KEY (createdby) REFERENCES public.users("userId") NOT VALID;


--
-- Name: chat_room_users fk_chat_room_user; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.chat_room_users
    ADD CONSTRAINT fk_chat_room_user FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: comment fk_comment_issue; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fk_comment_issue FOREIGN KEY (issueid) REFERENCES public.issue(issueid) NOT VALID;


--
-- Name: comment fk_comment_user; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fk_comment_user FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: issue fk_issue_assignee_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issue
    ADD CONSTRAINT fk_issue_assignee_userid FOREIGN KEY (assigneeuserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: issue fk_issue_project_id; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issue
    ADD CONSTRAINT fk_issue_project_id FOREIGN KEY (projectid) REFERENCES public.project(projectid) NOT VALID;


--
-- Name: issue fk_issue_reporter_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.issue
    ADD CONSTRAINT fk_issue_reporter_userid FOREIGN KEY (reporteruserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: message fk_message_roomid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT fk_message_roomid FOREIGN KEY (roomid) REFERENCES public.chat_room(roomid) NOT VALID;


--
-- Name: message fk_message_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT fk_message_userid FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: notification fk_notification_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk_notification_userid FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: project_documents fk_project_document_projectid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT fk_project_document_projectid FOREIGN KEY (projectid) REFERENCES public.project(projectid) NOT VALID;


--
-- Name: project_users fk_project_document_roleid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT fk_project_document_roleid FOREIGN KEY (roleid) REFERENCES public.role(roleid) NOT VALID;


--
-- Name: project_documents fk_project_document_uploaded_by; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_documents
    ADD CONSTRAINT fk_project_document_uploaded_by FOREIGN KEY (uploadedbyuserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: project fk_project_lead_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT fk_project_lead_userid FOREIGN KEY (leaduserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: project_users fk_project_users_projectid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT fk_project_users_projectid FOREIGN KEY (projectid) REFERENCES public.project(projectid) NOT VALID;


--
-- Name: project_users fk_project_users_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT fk_project_users_userid FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: review fk_review_taskid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_review_taskid FOREIGN KEY (taskid) REFERENCES public.task(taskid) NOT VALID;


--
-- Name: review fk_review_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_review_userid FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: sprint fk_sprint_projectid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT fk_sprint_projectid FOREIGN KEY (projectid) REFERENCES public.project(projectid) NOT VALID;


--
-- Name: sprint_tasks fk_sprint_spritid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint_tasks
    ADD CONSTRAINT fk_sprint_spritid FOREIGN KEY (sprintid) REFERENCES public.sprint(sprintid) NOT VALID;


--
-- Name: sprint_tasks fk_sprint_taskid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.sprint_tasks
    ADD CONSTRAINT fk_sprint_taskid FOREIGN KEY (taskid) REFERENCES public.task(taskid) NOT VALID;


--
-- Name: task fk_task_assignedto_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk_task_assignedto_userid FOREIGN KEY (assignedtouserid) REFERENCES public.users("userId") NOT VALID;


--
-- Name: task_dependency fk_task_dependency_dependent_taskid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependency
    ADD CONSTRAINT fk_task_dependency_dependent_taskid FOREIGN KEY (dependenttaskid) REFERENCES public.task(taskid) NOT VALID;


--
-- Name: task_dependency fk_task_dependency_taskid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task_dependency
    ADD CONSTRAINT fk_task_dependency_taskid FOREIGN KEY (taskid) REFERENCES public.task(taskid) NOT VALID;


--
-- Name: task fk_task_projectid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk_task_projectid FOREIGN KEY (projectid) REFERENCES public.project(projectid) NOT VALID;


--
-- Name: team_members fk_team_members_teamid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT fk_team_members_teamid FOREIGN KEY (teamid) REFERENCES public.team(teamid) NOT VALID;


--
-- Name: team_members fk_team_members_userid; Type: FK CONSTRAINT; Schema: public; Owner: yash
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT fk_team_members_userid FOREIGN KEY (userid) REFERENCES public.users("userId") NOT VALID;


--
-- PostgreSQL database dump complete
--

