--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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
-- Name: ParticipacionEnCombates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParticipacionEnCombates" (
    "idLuchador" integer NOT NULL,
    "idCombate" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ParticipacionEnCombates" OWNER TO postgres;

--
-- Name: arbitros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arbitros (
    id integer NOT NULL,
    nombre character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.arbitros OWNER TO postgres;

--
-- Name: combates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.combates (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    idarbitro integer,
    idevento integer,
    victoria integer
);


ALTER TABLE public.combates OWNER TO postgres;

--
-- Name: eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventos (
    id integer NOT NULL,
    nombre character varying(255),
    fecha timestamp with time zone,
    localizacion character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.eventos OWNER TO postgres;

--
-- Name: luchadores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.luchadores (
    id integer NOT NULL,
    nombre character varying(255),
    edad integer,
    especialidad character varying(255),
    victorias integer,
    derrotas integer,
    nacionalidad character varying(255),
    imagen character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "pesoId" integer,
    rango integer
);


ALTER TABLE public.luchadores OWNER TO postgres;

--
-- Name: pesos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pesos (
    id integer NOT NULL,
    nombre character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.pesos OWNER TO postgres;

--
-- Name: allcombates; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.allcombates AS
 SELECT DISTINCT e.id AS evento,
    l.nombre,
    l.nacionalidad,
    ar.nombre AS arbitro,
    c.id,
    pe.nombre AS peso,
    l.imagen
   FROM (((((public.eventos e
     JOIN public.combates c ON ((c.idevento = e.id)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
     JOIN public.luchadores l ON ((l.id = p."idLuchador")))
     JOIN public.pesos pe ON ((pe.id = l."pesoId")))
     JOIN public.arbitros ar ON ((ar.id = c.idarbitro)))
  ORDER BY c.id;


ALTER VIEW public.allcombates OWNER TO postgres;

--
-- Name: arbitros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arbitros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.arbitros_id_seq OWNER TO postgres;

--
-- Name: arbitros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arbitros_id_seq OWNED BY public.arbitros.id;


--
-- Name: arbitrosasignados; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.arbitrosasignados AS
 SELECT a.id,
    a.nombre AS arbitro,
    e.id AS num_evento,
    c.id AS combate
   FROM (((public.combates c
     JOIN public.eventos e ON ((c.idevento = e.id)))
     JOIN public.arbitros a ON ((a.id = c.idarbitro)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
  GROUP BY a.nombre, c.id, e.id, a.id;


ALTER VIEW public.arbitrosasignados OWNER TO postgres;

--
-- Name: campeones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campeones (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idPeso" integer NOT NULL,
    "idLuchador" integer NOT NULL
);


ALTER TABLE public.campeones OWNER TO postgres;

--
-- Name: porpesorango; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.porpesorango AS
 SELECT p.nombre AS peso,
    l.id,
    l.nombre,
    l.edad,
    l.especialidad,
    l.victorias,
    l.derrotas,
    l.nacionalidad,
    l.imagen,
    l."createdAt",
    l."updatedAt",
    l."pesoId" AS pesoid,
    l.rango
   FROM (public.luchadores l
     JOIN public.pesos p ON ((l."pesoId" = p.id)))
  ORDER BY l.rango;


ALTER VIEW public.porpesorango OWNER TO postgres;

--
-- Name: campeonesrango; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.campeonesrango AS
 SELECT peso,
    id,
    nombre,
    edad,
    especialidad,
    victorias,
    derrotas,
    nacionalidad,
    imagen,
    "createdAt",
    "updatedAt",
    pesoid,
    rango
   FROM public.porpesorango
  WHERE (rango = 0)
  ORDER BY pesoid;


ALTER VIEW public.campeonesrango OWNER TO postgres;

--
-- Name: combateevento; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.combateevento AS
 SELECT e.id,
    e.nombre AS evento,
    l.nombre,
    l.especialidad,
    e.fecha
   FROM (((public.eventos e
     JOIN public.combates c ON ((c.idevento = e.id)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
     JOIN public.luchadores l ON ((l.id = p."idLuchador")));


ALTER VIEW public.combateevento OWNER TO postgres;

--
-- Name: combates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.combates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.combates_id_seq OWNER TO postgres;

--
-- Name: combates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.combates_id_seq OWNED BY public.combates.id;


--
-- Name: combatesevento; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.combatesevento AS
 SELECT DISTINCT e.id,
    e.nombre AS evento,
    l.nombre,
    l.especialidad,
    e.fecha,
    c.id AS idcombate
   FROM (((public.eventos e
     JOIN public.combates c ON ((c.idevento = e.id)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
     JOIN public.luchadores l ON ((l.id = p."idLuchador")));


ALTER VIEW public.combatesevento OWNER TO postgres;

--
-- Name: eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventos_id_seq OWNER TO postgres;

--
-- Name: eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;


--
-- Name: idpelas; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.idpelas AS
 SELECT c.id
   FROM (((public.luchadores l
     JOIN public."ParticipacionEnCombates" p ON ((p."idLuchador" = l.id)))
     JOIN public.combates c ON ((c.id = p."idCombate")))
     JOIN public.eventos e ON ((e.id = c.idevento)))
  ORDER BY c.id;


ALTER VIEW public.idpelas OWNER TO postgres;

--
-- Name: idpeleas; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.idpeleas AS
 SELECT c.id AS pelea,
    l.id AS luchador
   FROM (((public.luchadores l
     JOIN public."ParticipacionEnCombates" p ON ((p."idLuchador" = l.id)))
     JOIN public.combates c ON ((c.id = p."idCombate")))
     JOIN public.eventos e ON ((e.id = c.idevento)))
  ORDER BY c.id;


ALTER VIEW public.idpeleas OWNER TO postgres;

--
-- Name: lastfight; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.lastfight AS
 SELECT l.id AS luchadorid,
    c.id AS pelea,
    l.nombre,
    e.id AS evento,
    c.victoria AS ganador,
    l.imagen
   FROM (((public.eventos e
     JOIN public.combates c ON ((c.idevento = e.id)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
     JOIN public.luchadores l ON ((l.id = p."idLuchador")))
  ORDER BY c.id DESC;


ALTER VIEW public.lastfight OWNER TO postgres;

--
-- Name: luchadores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.luchadores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.luchadores_id_seq OWNER TO postgres;

--
-- Name: luchadores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.luchadores_id_seq OWNED BY public.luchadores.id;


--
-- Name: luchadorespeso; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.luchadorespeso AS
 SELECT p.nombre AS peso,
    l.id,
    l.nombre,
    l.edad,
    l.especialidad,
    l.victorias,
    l.derrotas,
    l.nacionalidad,
    l.imagen,
    l."createdAt",
    l."updatedAt",
    l."pesoId"
   FROM (public.luchadores l
     JOIN public.pesos p ON ((l."pesoId" = p.id)))
  ORDER BY p.id;


ALTER VIEW public.luchadorespeso OWNER TO postgres;

--
-- Name: pesos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pesos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pesos_id_seq OWNER TO postgres;

--
-- Name: pesos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pesos_id_seq OWNED BY public.pesos.id;


--
-- Name: porpeso; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.porpeso AS
 SELECT p.nombre AS peso,
    l.id,
    l.nombre,
    l.edad,
    l.especialidad,
    l.victorias,
    l.derrotas,
    l.nacionalidad,
    l.imagen,
    l."createdAt",
    l."updatedAt",
    l."pesoId" AS pesoid
   FROM (public.luchadores l
     JOIN public.pesos p ON ((l."pesoId" = p.id)))
  ORDER BY p.*;


ALTER VIEW public.porpeso OWNER TO postgres;

--
-- Name: ranking; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.ranking AS
 SELECT peso,
    id,
    nombre,
    edad,
    especialidad,
    victorias,
    derrotas,
    nacionalidad,
    imagen,
    "createdAt",
    "updatedAt",
    pesoid,
    rango
   FROM public.porpesorango
  WHERE (rango > 0)
  ORDER BY pesoid, rango;


ALTER VIEW public.ranking OWNER TO postgres;

--
-- Name: sugerencias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sugerencias (
    id integer NOT NULL,
    usuario character varying(255),
    correo character varying(255),
    luchador1 character varying(255),
    luchador2 character varying(255),
    descripcion character varying(1000) DEFAULT NULL::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.sugerencias OWNER TO postgres;

--
-- Name: sugerencias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sugerencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sugerencias_id_seq OWNER TO postgres;

--
-- Name: sugerencias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sugerencias_id_seq OWNED BY public.sugerencias.id;


--
-- Name: ultimoscombates; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.ultimoscombates AS
 SELECT e.id AS eventoid,
    c.id AS peleaid,
    l.nombre,
    l.victorias,
    l.derrotas,
    l.especialidad,
    l.nacionalidad AS pais,
    pe.nombre AS peso,
    l.imagen AS img
   FROM ((((public.eventos e
     JOIN public.combates c ON ((e.id = c.idevento)))
     JOIN public."ParticipacionEnCombates" p ON ((p."idCombate" = c.id)))
     JOIN public.luchadores l ON ((l.id = p."idLuchador")))
     JOIN public.pesos pe ON ((l."pesoId" = pe.id)))
  WHERE (e.id = ( SELECT max(eventos.id) AS max
           FROM public.eventos));


ALTER VIEW public.ultimoscombates OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    usuario character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    clave character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: arbitros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arbitros ALTER COLUMN id SET DEFAULT nextval('public.arbitros_id_seq'::regclass);


--
-- Name: combates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combates ALTER COLUMN id SET DEFAULT nextval('public.combates_id_seq'::regclass);


--
-- Name: eventos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);


--
-- Name: luchadores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.luchadores ALTER COLUMN id SET DEFAULT nextval('public.luchadores_id_seq'::regclass);


--
-- Name: pesos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pesos ALTER COLUMN id SET DEFAULT nextval('public.pesos_id_seq'::regclass);


--
-- Name: sugerencias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sugerencias ALTER COLUMN id SET DEFAULT nextval('public.sugerencias_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ParticipacionEnCombates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ParticipacionEnCombates" ("idLuchador", "idCombate", "createdAt", "updatedAt") FROM stdin;
11	1	2024-04-29 08:28:29.168+00	2024-04-29 08:28:29.168+00
6	1	2024-04-29 08:28:29.219+00	2024-04-29 08:28:29.219+00
13	2	2024-04-29 08:29:34.7+00	2024-04-29 08:29:34.7+00
12	2	2024-04-29 08:29:34.76+00	2024-04-29 08:29:34.76+00
24	3	2024-04-29 08:30:05.929+00	2024-04-29 08:30:05.929+00
25	3	2024-04-29 08:30:05.985+00	2024-04-29 08:30:05.985+00
39	4	2024-05-08 07:56:33.915+00	2024-05-08 07:56:33.915+00
40	4	2024-05-08 07:56:33.966+00	2024-05-08 07:56:33.966+00
12	5	2024-05-08 07:58:06.193+00	2024-05-08 07:58:06.193+00
14	5	2024-05-08 07:58:06.253+00	2024-05-08 07:58:06.253+00
41	6	2024-05-08 15:40:33.822+00	2024-05-08 15:40:33.822+00
26	6	2024-05-08 15:40:33.87+00	2024-05-08 15:40:33.87+00
25	7	2024-05-09 17:16:10.035+00	2024-05-09 17:16:10.035+00
24	7	2024-05-09 17:16:10.085+00	2024-05-09 17:16:10.085+00
32	8	2024-05-12 09:14:24.956+00	2024-05-12 09:14:24.956+00
33	8	2024-05-12 09:14:25.015+00	2024-05-12 09:14:25.015+00
\.


--
-- Data for Name: arbitros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arbitros (id, nombre, "createdAt", "updatedAt") FROM stdin;
1	Herb Dean	2024-04-29 08:16:32.841+00	2024-04-29 08:16:32.841+00
3	Dan Miragliotta	2024-04-29 08:16:32.842+00	2024-04-29 08:16:32.842+00
6	John McCarthy	2024-04-29 08:16:32.842+00	2024-04-29 08:16:32.842+00
2	Mike Beltran	2024-04-29 08:16:32.842+00	2024-04-29 08:16:32.842+00
4	Marc Goddard	2024-04-29 08:16:32.842+00	2024-04-29 08:16:32.842+00
5	Jason Herzog	2024-04-29 08:16:32.842+00	2024-04-29 08:16:32.842+00
\.


--
-- Data for Name: campeones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campeones ("createdAt", "updatedAt", "idPeso", "idLuchador") FROM stdin;
\.


--
-- Data for Name: combates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.combates (id, "createdAt", "updatedAt", idarbitro, idevento, victoria) FROM stdin;
3	2024-04-29 08:23:42.752+00	2024-04-29 08:23:42.752+00	1	271	\N
4	2024-05-08 07:55:49.563+00	2024-05-08 07:55:49.563+00	1	301	\N
6	2024-05-08 15:39:55.451+00	2024-05-08 15:39:55.451+00	2	301	\N
7	2024-05-09 17:15:49.671+00	2024-05-09 17:15:49.671+00	1	298	\N
8	2024-05-12 09:13:36.757+00	2024-05-12 09:13:36.757+00	1	301	\N
2	2024-04-29 08:23:29.067+00	2024-04-29 08:23:29.067+00	5	269	12
5	2024-05-08 07:57:10.852+00	2024-05-08 07:57:10.852+00	3	301	12
1	2024-04-29 08:23:15.352+00	2024-04-29 08:23:15.352+00	2	298	11
\.


--
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventos (id, nombre, fecha, localizacion, "createdAt", "updatedAt") FROM stdin;
298	UFC 298: Volkanovski vs. Ilia Topuria	2024-04-09 00:00:00+00	Jacksonville, Florida, EE. UU.	2024-04-29 08:21:33.647+00	2024-04-29 08:21:33.647+00
271	UFC 271: Adesanya vs. Whittaker 2	2024-02-28 00:00:00+00	Houston, Texas, EE. UU.	2024-04-29 08:21:33.648+00	2024-04-29 08:21:33.648+00
270	UFC 270: Jon Jones vs. Gane	2024-01-22 00:00:00+00	Anaheim, California, EE. UU.	2024-04-29 08:21:33.648+00	2024-04-29 08:21:33.648+00
272	UFC 272: Covington vs. Masvidal	2024-04-05 00:00:00+00	Dallas, Texas, EE. UU.	2024-04-29 08:21:33.648+00	2024-04-29 08:21:33.648+00
269	UFC 269: Oliveira vs. Gaethje	2023-12-11 00:00:00+00	Las Vegas, Nevada, EE. UU.	2024-04-29 08:21:33.648+00	2024-04-29 08:21:33.648+00
301	UFC 301: Jon Jones vs. Tom Aspinall	2024-06-21 00:00:00+00	Jacksonville, Florida, EE. UU.	2024-05-08 07:55:16.404+00	2024-05-08 07:55:16.404+00
\.


--
-- Data for Name: luchadores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.luchadores (id, nombre, edad, especialidad, victorias, derrotas, nacionalidad, imagen, "createdAt", "updatedAt", "pesoId", rango) FROM stdin;
1	Brandon Moreno	28	Boxeo y Jiu-Jitsu	\N	\N	México	brandon.png	2024-04-29 07:58:34.451+00	2024-04-29 07:58:34.451+00	1	2
73	Askar Askarov	28	Lucha	14	0	ru	askar_askarov.png	2024-05-10 18:28:15.727+00	2024-05-10 18:28:15.727+00	1	7
78	Yair Rodríguez	29	Taekwondo y Jiu-Jitsu	13	2	mx	yair_rodriguez.png	2024-05-10 18:30:25.284+00	2024-05-10 18:30:25.284+00	2	6
84	Rafael dos Anjos	37	Muay Thai y Jiu-Jitsu	30	13	br	rafael_dos_anjos.png	2024-05-10 18:31:42.095+00	2024-05-10 18:31:42.095+00	3	9
88	Demian Maia	44	Jiu-Jitsu Brasileño	28	10	br	demian_maia.png	2024-05-10 18:32:40.699+00	2024-05-10 18:32:40.699+00	4	8
96	Chris Weidman	37	Lucha colegial	15	6	us	chris_weidman.png	2024-05-10 18:34:03.199+00	2024-05-10 18:34:03.199+00	5	8
100	Thiago Santos	38	Muay Thai	22	9	br	thiago_santos.png	2024-05-10 18:34:57.106+00	2024-05-10 18:34:57.106+00	6	9
105	Curtis Blaydes	30	Lucha colegial	15	3	us	curtis_blaydes.png	2024-05-10 18:35:55.673+00	2024-05-10 18:35:55.673+00	7	8
39	Jon Jones	34	Muay Thai y Lucha Libre	\N	\N	us	jonjones.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	0
41	Sean Strickland	30	Striking	\N	\N	us	strickland.png	2024-05-08 13:54:30.544+00	2024-05-08 13:54:30.544+00	5	1
26	Paulo Costa	30	Boxeo y Jiu-Jitsu Brasileño	\N	\N	br	paulo.png	2024-04-29 08:08:56.851+00	2024-04-29 08:08:56.851+00	5	4
24	Israel Adesanya	32	Kickboxing	\N	\N	ng	adesanya.png	2024-04-29 08:08:56.851+00	2024-04-29 08:08:56.851+00	5	2
28	Derek Brunson	37	Lucha libre	\N	\N	us	derek.png	2024-04-29 08:08:56.852+00	2024-04-29 08:08:56.852+00	5	5
27	Jared Cannonier	37	Boxeo y Jiu-Jitsu Brasileño	\N	\N	us	jared.png	2024-04-29 08:08:56.851+00	2024-04-29 08:08:56.851+00	5	6
32	Jiri Prochazka	28	Karate	\N	\N	República Checa	jiri.png	2024-04-29 08:12:46.902+00	2024-04-29 08:12:46.902+00	6	2
29	Jan Błachowicz	38	Judo y Kickboxing	\N	\N	Polonia	jan.png	2024-04-29 08:12:46.901+00	2024-04-29 08:12:46.901+00	6	3
33	Magomed Ankalaev	29	Sambo	\N	\N	ru	ankalaev.png	2024-04-29 08:12:46.902+00	2024-04-29 08:12:46.902+00	6	4
30	Glover Teixeira	42	Jiu-Jitsu Brasileño	\N	\N	br	glover.png	2024-04-29 08:12:46.901+00	2024-04-29 08:12:46.901+00	6	5
31	Aleksandar Rakić	29	Kickboxing	\N	\N	Austria	rakic.png	2024-04-29 08:12:46.902+00	2024-04-29 08:12:46.902+00	6	6
36	Ciryl Gane	31	Muay Thai	\N	\N	Francia	gane.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	2
38	Derrick Lewis	36	Boxeo	\N	\N	us	derrick.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	5
35	Stipe Miocic	38	Lucha colegial	\N	\N	us	miocic.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	3
34	Francis Ngannou	34	Boxeo y Jiu-Jitsu Brasileño	\N	\N	Camerún	ngannou.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	6
74	Joseph Benavidez	37	Lucha y Jiu-Jitsu	28	8	us	joseph_benavidez.png	2024-05-10 18:28:15.726+00	2024-05-10 18:28:15.726+00	1	5
71	Song Yadong	24	Sanda y Jiu-Jitsu	17	5	China	song.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	7
82	Arnold Allen	28	Jiu-Jitsu	17	1	uk	arnold_allen.png	2024-05-10 18:30:25.285+00	2024-05-10 18:30:25.285+00	2	10
83	Beneil Dariush	32	Lucha y Jiu-Jitsu	21	4	us	beneil_dariush.png	2024-05-10 18:31:42.095+00	2024-05-10 18:31:42.095+00	3	8
89	Stephen Thompson	39	Kickboxing	16	5	us	stephen_thompson.png	2024-05-10 18:32:40.699+00	2024-05-10 18:32:40.699+00	4	6
93	Jack Hermansson	33	Lucha	22	6	se	jack_hermansson.png	2024-05-10 18:34:03.199+00	2024-05-10 18:34:03.199+00	5	10
98	Anthony Smith	33	Lucha colegial	35	17	us	anthony_smith.png	2024-05-10 18:34:57.106+00	2024-05-10 18:34:57.106+00	6	8
104	Marcin Tybura	35	Judo	24	7	pl	tybura.png	2024-05-10 18:35:55.673+00	2024-05-10 18:35:55.673+00	7	10
72	Alex Perez	29	Lucha y Jiu-Jitsu	24	6	us	alex_perez.png	2024-05-10 18:28:15.727+00	2024-05-10 18:28:15.727+00	1	6
77	Brandon Royval	29	Jiu-Jitsu	12	6	us	brandon_royval.png	2024-05-10 18:28:15.728+00	2024-05-10 18:28:15.728+00	1	10
81	Josh Emmett	36	Boxeo	16	2	us	josh_emmett.png	2024-05-10 18:30:25.285+00	2024-05-10 18:30:25.285+00	2	7
85	Dan Hooker	31	Muay Thai y Jiu-Jitsu	21	11	nz	dan_hooker.png	2024-05-10 18:31:42.095+00	2024-05-10 18:31:42.095+00	3	7
91	Jorge Masvidal	37	Boxeo y Lucha	35	15	us	jorge_masvidal.png	2024-05-10 18:32:40.699+00	2024-05-10 18:32:40.699+00	4	7
95	Uriah Hall	37	Karate	17	10	jm	uriah_hall.png	2024-05-10 18:34:03.199+00	2024-05-10 18:34:03.199+00	5	7
97	Ryan Spann	30	Jiu-Jitsu	20	7	us	ryan_spann.png	2024-05-10 18:34:57.106+00	2024-05-10 18:34:57.106+00	6	10
106	Raulian Paiva	26	Muay Thai y BJJ	8	2	Brasil	paiva.png	2024-05-10 18:38:21.229+00	2024-05-10 18:38:21.229+00	\N	10
75	David Dvorak	29	Boxeo y Jiu-Jitsu	20	3	cz	david_dvorak.png	2024-05-10 18:28:15.728+00	2024-05-10 18:28:15.728+00	1	9
70	José Aldo	35	Muay Thai y BJJ	29	13	Brasil	aldo.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	8
80	Bryce Mitchell	27	Lucha y Jiu-Jitsu	14	0	us	bryce_mitchell.png	2024-05-10 18:30:25.285+00	2024-05-10 18:30:25.285+00	2	9
87	Paul Felder	37	Muay Thai	17	7	us	paul_felder.png	2024-05-10 18:31:42.094+00	2024-05-10 18:31:42.094+00	3	6
90	Geoff Neal	31	Boxeo	13	5	us	geoff_neal.png	2024-05-10 18:32:40.699+00	2024-05-10 18:32:40.699+00	4	10
94	Kelvin Gastelum	30	Lucha colegial	17	7	us	kelvin_gastelum.png	2024-05-10 18:34:03.199+00	2024-05-10 18:34:03.199+00	5	9
11	Ilia Topuria	24	Lucha	\N	\N	ge	ilia.png	2024-04-29 08:01:18.339+00	2024-04-29 08:01:18.339+00	2	0
9	Max Holloway	29	Boxeo y Jiu-Jitsu	\N	\N	us	max.png	2024-04-29 08:01:18.338+00	2024-04-29 08:01:18.338+00	2	2
12	Charles Oliveira	32	Jiu-Jitsu Brasileño	\N	\N	br	iliveira.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	1
14	Michael Chandler	35	Lucha colegial	\N	\N	us	chandler.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	4
13	Justin Gaethje	32	Lucha colegial	\N	\N	us	justin.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	3
76	Kai Kara-France	28	Boxeo y Jiu-Jitsu	22	9	nz	kai_kara_france.png	2024-05-10 18:28:15.727+00	2024-05-10 18:28:15.727+00	1	8
3	Alexandre Pantoja	31	Muay Thai y Jiu-Jitsu	\N	\N	br	pantoja.png	2024-04-29 07:58:34.452+00	2024-04-29 07:58:34.452+00	1	0
2	Demetrious Johnson	34	Lucha y Jiu-Jitsu	\N	\N	us	demetrius.png	2024-04-29 07:58:34.451+00	2024-04-29 07:58:34.451+00	1	4
4	Deiveson Figueiredo	33	Muay Thai y Jiu-Jitsu	21	2	br	figue.png	2024-04-29 07:58:34.452+00	2024-04-29 07:58:34.452+00	1	1
8	Zabit Magomedsharipov	30	Sambo y Jiu-Jitsu	\N	\N	ru	zabit.png	2024-04-29 08:01:18.338+00	2024-04-29 08:01:18.338+00	2	5
10	Brian Ortega	30	Jiu-Jitsu	\N	\N	us	ortega.png	2024-04-29 08:01:18.338+00	2024-04-29 08:01:18.338+00	2	3
17	Islam Makhachev	30	Sambo	\N	\N	ru	islam.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	0
16	Dustin Poirier	33	Boxeo y Jiu-Jitsu Brasileño	\N	\N	us	dustin.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	2
15	Tony Ferguson	38	Jiu-Jitsu Brasileño	\N	\N	us	tony.png	2024-04-29 08:04:51.097+00	2024-04-29 08:04:51.097+00	3	5
20	Gilbert Burns	35	Jiu-Jitsu Brasileño	\N	\N	br	gilbert.png	2024-04-29 08:06:51.028+00	2024-04-29 08:06:51.028+00	4	4
22	Leon Edwards	30	Kickboxing	\N	\N	Jamaica	leon.png	2024-04-29 08:06:51.028+00	2024-04-29 08:06:51.028+00	4	0
21	Vicente Luque	29	Jiu-Jitsu Brasileño	\N	\N	br	vicente.png	2024-04-29 08:06:51.028+00	2024-04-29 08:06:51.028+00	4	5
18	Colby Covington	33	Lucha colegial	\N	\N	us	colby.png	2024-04-29 08:06:51.028+00	2024-04-29 08:06:51.028+00	4	3
19	Kamaru Usman	34	Lucha colegial	\N	\N	Nigeria	usman.png	2024-04-29 08:06:51.028+00	2024-04-29 08:06:51.028+00	4	1
5	Askar Askarov	28	Lucha	\N	\N	ru	askar_askarov.png	2024-04-29 07:58:34.452+00	2024-04-29 07:58:34.452+00	1	3
6	Alexander Volkanovski	32	Boxeo y Lucha	26	4	au	volka.png	2024-04-29 08:01:18.338+00	2024-04-29 08:01:18.338+00	2	1
63	Sean O'Malley	27	Striking	10	2	Estados Unidos	sugar.png	2024-05-10 09:54:53.202+00	2024-05-10 09:54:53.202+00	8	0
64	Marlon Vera	29	Muay Thai y BJJ	15	7	Ecuador	vera.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	4
65	Petr Yan	28	Boxeo y Sambo	16	2	Rusia	yan.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	3
62	Cory Sandhagen	29	Muay Thai y BJJ	12	3	Estados Unidos	cory.png	2024-05-10 09:54:53.202+00	2024-05-10 09:54:53.202+00	8	2
66	Merab Dvalishvili	30	Lucha	8	3	Georgia	merab.png	2024-05-10 09:54:53.202+00	2024-05-10 09:54:53.202+00	8	1
67	Henry Cejudo	34	Lucha olímpica y Boxeo	16	3	Estados Unidos	cejudo.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	5
69	Rob Font	34	Boxeo	19	4	Estados Unidos	rob.png	2024-05-10 09:54:53.203+00	2024-05-10 09:54:53.203+00	8	9
79	Shane Burgos	30	Boxeo	13	3	us	shane_burgos.png	2024-05-10 18:30:25.285+00	2024-05-10 18:30:25.285+00	2	8
42	Dricus Du Plessis	27	Boxeo y Jiu-Jitsu	\N	\N	Sudáfrica	dricus.png	2024-05-10 09:51:55.837+00	2024-05-10 09:51:55.837+00	5	0
40	Tom Aspinall	28	Boxeo y Jiu-Jitsu Brasileño	\N	\N	gb-eng	tom-aspinall.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	1
86	Islam Makhachev	30	Sambo	\N	\N	ru	islam.png	2024-05-10 18:31:42.095+00	2024-05-10 18:31:42.095+00	3	10
23	Alex Poatan Pereira	35	Kickboxing	\N	\N	br	pereira.png	2024-04-29 08:08:56.851+00	2024-04-29 08:08:56.851+00	6	0
25	Robert Whittaker	31	Karate y Hapkido	\N	\N	us	whittaker.png	2024-04-29 08:08:56.851+00	2024-04-29 08:08:56.851+00	5	3
7	Chan Sung Jung	34	Boxeo y Taekwondo	\N	\N	Corea del Sur	chang.png	2024-04-29 08:01:18.338+00	2024-04-29 08:01:18.338+00	2	4
92	Neil Magny	34	Lucha y Jiu-Jitsu	25	10	us	neil_magny.png	2024-05-10 18:32:40.699+00	2024-05-10 18:32:40.699+00	4	9
99	Dominick Reyes	32	Boxeo	12	3	us	dominick_reyes.png	2024-05-10 18:34:57.106+00	2024-05-10 18:34:57.106+00	6	7
102	Jairzinho Rozenstruik	33	Kickboxing	13	2	sr	rozenstruik.png	2024-05-10 18:35:55.673+00	2024-05-10 18:35:55.673+00	7	9
103	Alistair Overeem	42	Kickboxing y Jiu-Jitsu Brasileño	47	19	nl	overeem.png	2024-05-10 18:35:55.673+00	2024-05-10 18:35:55.673+00	7	7
37	Alexander Volkov	33	Boxeo y Sambo	\N	\N	ru	volkov.png	2024-04-29 08:13:17.303+00	2024-04-29 08:13:17.303+00	7	4
\.


--
-- Data for Name: pesos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pesos (id, nombre, "createdAt", "updatedAt") FROM stdin;
6	Peso Semipesado	2024-04-29 07:56:19.252+00	2024-04-29 07:56:19.252+00
7	Peso Pesado	2024-04-29 07:56:24.094+00	2024-04-29 07:56:24.094+00
8	Peso Gallo	2024-05-10 09:34:11.903+00	2024-05-10 09:34:11.903+00
1	Peso Mosca	2024-04-29 07:55:38.661+00	2024-04-29 07:55:38.661+00
2	Peso Pluma	2024-04-29 07:55:50.514+00	2024-04-29 07:55:50.514+00
3	Peso Ligero	2024-04-29 07:55:56.711+00	2024-04-29 07:55:56.711+00
4	Peso Welter	2024-04-29 07:56:06.383+00	2024-04-29 07:56:06.383+00
5	Peso Medio	2024-04-29 07:56:12.815+00	2024-04-29 07:56:12.815+00
\.


--
-- Data for Name: sugerencias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sugerencias (id, usuario, correo, luchador1, luchador2, descripcion, "createdAt", "updatedAt") FROM stdin;
3	juan	juan@gmail.com	Mario	Joselu	Estaria de locos	2024-05-14 11:47:22.123+00	2024-05-14 11:47:22.123+00
2	Jacinto	\N	\N	\N	\N	2024-05-14 11:45:13.923+00	2024-05-14 11:49:13.488+00
4	Alex	pruebita@gmail.com	Merab Dvalishvili	Sean O'Malley	Pelea por el titulo	2024-05-14 13:11:58.474+00	2024-05-14 13:11:58.474+00
5	Alex	pruebita@gmail.com	Jorge Masvidal	Vicente Luque	Pelea por el titulo	2024-05-14 13:14:01.844+00	2024-05-14 13:14:01.844+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, usuario, correo, clave) FROM stdin;
1	manolo8	jerarde@gmail.com	$2b$10$g2NPEN.t0dIiATUJiDOQlOlBSl94NC5CB4l7I9b3jSYGKpU5UBWwe
\.


--
-- Name: arbitros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arbitros_id_seq', 6, true);


--
-- Name: combates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.combates_id_seq', 8, true);


--
-- Name: eventos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventos_id_seq', 5, true);


--
-- Name: luchadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.luchadores_id_seq', 106, true);


--
-- Name: pesos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pesos_id_seq', 8, true);


--
-- Name: sugerencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sugerencias_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: ParticipacionEnCombates ParticipacionEnCombates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipacionEnCombates"
    ADD CONSTRAINT "ParticipacionEnCombates_pkey" PRIMARY KEY ("idLuchador", "idCombate");


--
-- Name: arbitros arbitros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arbitros
    ADD CONSTRAINT arbitros_pkey PRIMARY KEY (id);


--
-- Name: campeones campeones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campeones
    ADD CONSTRAINT campeones_pkey PRIMARY KEY ("idPeso", "idLuchador");


--
-- Name: combates combates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combates
    ADD CONSTRAINT combates_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- Name: luchadores luchadores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.luchadores
    ADD CONSTRAINT luchadores_pkey PRIMARY KEY (id);


--
-- Name: pesos pesos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pesos
    ADD CONSTRAINT pesos_pkey PRIMARY KEY (id);


--
-- Name: sugerencias sugerencias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sugerencias
    ADD CONSTRAINT sugerencias_pkey PRIMARY KEY (id);


--
-- Name: users users_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_correo_key UNIQUE (correo);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_usuario_key UNIQUE (usuario);


--
-- Name: ParticipacionEnCombates ParticipacionEnCombates_idCombate_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipacionEnCombates"
    ADD CONSTRAINT "ParticipacionEnCombates_idCombate_fkey" FOREIGN KEY ("idCombate") REFERENCES public.combates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipacionEnCombates ParticipacionEnCombates_idLuchador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipacionEnCombates"
    ADD CONSTRAINT "ParticipacionEnCombates_idLuchador_fkey" FOREIGN KEY ("idLuchador") REFERENCES public.luchadores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campeones campeones_idLuchador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campeones
    ADD CONSTRAINT "campeones_idLuchador_fkey" FOREIGN KEY ("idLuchador") REFERENCES public.luchadores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: combates combates_idarbitro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combates
    ADD CONSTRAINT combates_idarbitro_fkey FOREIGN KEY (idarbitro) REFERENCES public.arbitros(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: combates combates_idevento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combates
    ADD CONSTRAINT combates_idevento_fkey FOREIGN KEY (idevento) REFERENCES public.eventos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: combates combates_victoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combates
    ADD CONSTRAINT combates_victoria_fkey FOREIGN KEY (victoria) REFERENCES public.luchadores(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

