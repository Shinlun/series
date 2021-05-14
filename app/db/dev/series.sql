--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.3

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
-- Name: platforms; Type: TABLE; Schema: public; Owner: armand
--

CREATE TABLE public.platforms (
    platform_id integer NOT NULL,
    platform_name text NOT NULL
);


ALTER TABLE public.platforms OWNER TO armand;

--
-- Name: platforms_id_seq; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public.platforms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.platforms_id_seq OWNER TO armand;

--
-- Name: platforms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: armand
--

ALTER SEQUENCE public.platforms_id_seq OWNED BY public.platforms.platform_id;


--
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public.series_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_id_seq OWNER TO armand;

--
-- Name: series; Type: TABLE; Schema: public; Owner: armand
--

CREATE TABLE public.series (
    serie_id integer DEFAULT nextval('public.series_id_seq'::regclass) NOT NULL,
    serie_name text NOT NULL,
    plateform integer NOT NULL,
    rating numeric(2,1) NOT NULL,
    CONSTRAINT series_rating_check1 CHECK (((rating >= 0.0) AND (rating <= 5.0)))
);


ALTER TABLE public.series OWNER TO armand;

--
-- Name: series_id_seq1; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public.series_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_id_seq1 OWNER TO armand;

--
-- Name: series_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: armand
--

ALTER SEQUENCE public.series_id_seq1 OWNED BY public.series.serie_id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: armand
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    tag text NOT NULL
);


ALTER TABLE public.tags OWNER TO armand;

--
-- Name: tagsSeries; Type: TABLE; Schema: public; Owner: armand
--

CREATE TABLE public."tagsSeries" (
    id integer NOT NULL,
    serie_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public."tagsSeries" OWNER TO armand;

--
-- Name: tagsSeries_id_seq; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public."tagsSeries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."tagsSeries_id_seq" OWNER TO armand;

--
-- Name: tagsSeries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: armand
--

ALTER SEQUENCE public."tagsSeries_id_seq" OWNED BY public."tagsSeries".id;


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO armand;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: armand
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: waos; Type: TABLE; Schema: public; Owner: armand
--

CREATE TABLE public.waos (
    id integer NOT NULL,
    wao integer NOT NULL
);


ALTER TABLE public.waos OWNER TO armand;

--
-- Name: wao_id_seq; Type: SEQUENCE; Schema: public; Owner: armand
--

CREATE SEQUENCE public.wao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wao_id_seq OWNER TO armand;

--
-- Name: wao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: armand
--

ALTER SEQUENCE public.wao_id_seq OWNED BY public.waos.id;


--
-- Name: platforms platform_id; Type: DEFAULT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.platforms ALTER COLUMN platform_id SET DEFAULT nextval('public.platforms_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: tagsSeries id; Type: DEFAULT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public."tagsSeries" ALTER COLUMN id SET DEFAULT nextval('public."tagsSeries_id_seq"'::regclass);


--
-- Name: waos id; Type: DEFAULT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.waos ALTER COLUMN id SET DEFAULT nextval('public.wao_id_seq'::regclass);


--
-- Data for Name: platforms; Type: TABLE DATA; Schema: public; Owner: armand
--

COPY public.platforms (platform_id, platform_name) FROM stdin;
1	netflix
2	hbo
3	amazon prime video
4	obs
5	internet
6	canal +
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: armand
--

COPY public.series (serie_id, serie_name, plateform, rating) FROM stdin;
1	stranger things	1	4.5
2	black list	1	3.5
3	how to sell drug online fast	1	4.0
4	working moms	1	3.5
8	treadstone	3	5.0
9	ozark	1	5.0
10	la casa de papel	1	3.0
11	the end of the fucking world	1	4.0
12	sex education	1	4.0
13	13 reasons why	1	2.5
14	wrecked	5	5.0
15	gotham	1	3.5
16	punisher	1	4.5
18	dark	1	4.5
7	le transperce neige	1	1.5
20	ash vs evil dead	1	4.5
21	the order	1	0.5
22	community	1	4.0
23	lucifer	1	3.5
24	loaded	1	4.0
25	sick note	1	4.0
26	rosewood	1	2.0
27	lethal weapon	1	3.0
29	luther	1	4.5
30	top boy	1	5.0
31	black earth rising	1	4.5
32	santa clarita diet	1	4.0
33	hollywood	1	3.5
34	the hunters	3	5.0
35	the good place	1	1.0
36	upload	3	1.5
37	the man in the high castle	3	3.0
38	titans	1	2.5
39	brooklyn nine-nine	1	5.0
40	black mirror	1	3.5
41	sherlock	1	4.0
42	desenchantée	1	3.5
43	final space	1	4.5
44	misfits	1	3.5
45	designated survivor	1	3.5
46	quantico	1	3.0
48	safe	1	4.0
49	intimidation	1	4.0
50	doctor foster	1	2.5
51	wanted	1	3.5
52	limitless	1	4.0
53	maniac	1	3.5
54	bodyguard	1	3.0
55	daybreak	1	2.5
56	dirk gently	1	5.0
57	silicon valley	5	4.5
58	familly business	1	4.5
60	space force	1	2.5
61	pine gap	1	2.5
62	ragnarok	1	2.5
64	umbrella academy	1	2.5
65	white gold	1	4.5
63	the boyz	3	4.0
66	the big bang theory	1	5.0
67	penny worth	3	4.0
68	scream queens	1	4.5
69	jack rayan	3	4.0
70	teenage bounty hunters	1	3.5
71	izombie	1	3.5
72	how to get away with murders	1	4.0
73	truth seekers	3	3.5
74	queen's gambit	1	3.0
75	swedish dicks	1	3.5
77	la flamme	6	3.0
78	we hunt together	1	4.0
79	lupin	1	2.5
80	rick & morty	1	4.5
83	lock by key	1	3.5
84	mon ami adele	1	3.0
85	futurman	3	4.5
87	criminal england	1	4.0
86	the night manager	3	4.5
5	good girls	1	4.0
47	outer banks	1	4.0
17	you	1	3.0
28	the rain	1	3.0
59	insatiable	1	3.0
81	the crew	1	3.0
82	the ranch	1	3.0
19	westworld	2	2.5
76	wanderlust	1	2.5
6	swamp thing	3	1.0
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: armand
--

COPY public.tags (id, tag) FROM stdin;
1	action
2	drole
3	drame
4	policier
5	dessin animé
6	science fiction
7	sitcom
9	thriller
10	suspense
11	horreur
\.


--
-- Data for Name: tagsSeries; Type: TABLE DATA; Schema: public; Owner: armand
--

COPY public."tagsSeries" (id, serie_id, tag_id) FROM stdin;
2	66	2
3	66	7
4	56	6
5	56	4
6	56	2
7	39	2
8	39	4
9	39	7
10	34	10
11	34	3
12	34	9
13	30	1
14	30	3
15	30	10
16	14	2
17	9	3
18	9	9
19	9	10
20	8	1
21	8	9
22	86	1
23	85	2
24	85	1
25	85	6
26	80	5
27	80	2
28	68	2
29	68	11
30	65	2
31	58	2
32	57	2
33	43	2
34	43	3
35	43	5
36	31	9
37	31	10
38	31	3
39	29	4
40	29	9
41	20	11
42	20	2
43	18	6
44	18	9
45	18	3
46	16	1
47	1	6
48	1	11
49	87	4
50	87	10
51	78	4
52	78	9
53	72	4
54	72	3
55	69	1
56	67	1
57	63	1
58	63	11
59	52	9
60	49	9
61	48	9
62	47	3
63	41	4
64	32	2
65	32	1
66	25	2
67	24	2
68	22	7
69	22	2
70	12	2
71	11	3
72	5	3
73	5	4
74	3	3
75	83	3
76	83	6
77	75	4
78	75	2
79	73	6
80	71	4
81	71	3
82	70	4
83	70	2
84	53	9
85	53	6
86	51	4
87	51	3
88	45	1
89	44	2
90	44	3
91	42	5
92	42	2
93	40	3
94	40	9
95	33	3
96	23	4
97	15	4
98	15	1
99	15	3
100	4	2
101	2	4
102	2	1
103	84	3
104	82	7
105	82	2
106	81	7
107	81	2
108	77	2
109	74	9
110	59	2
111	54	1
112	46	4
113	37	9
114	28	3
115	27	4
116	17	9
117	10	9
118	79	4
119	76	3
120	64	1
121	62	3
122	61	9
123	60	2
124	55	3
125	50	3
126	38	1
127	19	6
128	13	3
129	26	4
130	36	6
131	7	3
132	35	7
133	6	11
134	21	3
\.


--
-- Data for Name: waos; Type: TABLE DATA; Schema: public; Owner: armand
--

COPY public.waos (id, wao) FROM stdin;
2	39
4	34
5	30
6	9
8	31
9	18
\.


--
-- Name: platforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public.platforms_id_seq', 5, true);


--
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public.series_id_seq', 87, true);


--
-- Name: series_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public.series_id_seq1', 1, false);


--
-- Name: tagsSeries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public."tagsSeries_id_seq"', 134, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public.tags_id_seq', 12, true);


--
-- Name: wao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: armand
--

SELECT pg_catalog.setval('public.wao_id_seq', 9, true);


--
-- Name: platforms platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (platform_id);


--
-- Name: platforms platforms_platform_name_key; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_platform_name_key UNIQUE (platform_name);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (serie_id);


--
-- Name: series series_serie_name_key; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_serie_name_key UNIQUE (serie_name);


--
-- Name: tagsSeries tagsSeries_pkey; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public."tagsSeries"
    ADD CONSTRAINT "tagsSeries_pkey" PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tags tags_tag_key; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_tag_key UNIQUE (tag);


--
-- Name: waos wao_pkey; Type: CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.waos
    ADD CONSTRAINT wao_pkey PRIMARY KEY (id);


--
-- Name: series series_plateform_fkey; Type: FK CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_plateform_fkey FOREIGN KEY (plateform) REFERENCES public.platforms(platform_id);


--
-- Name: tagsSeries tagsSeries_serie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public."tagsSeries"
    ADD CONSTRAINT "tagsSeries_serie_id_fkey" FOREIGN KEY (serie_id) REFERENCES public.series(serie_id);


--
-- Name: tagsSeries tagsSeries_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public."tagsSeries"
    ADD CONSTRAINT "tagsSeries_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: waos waos_wao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: armand
--

ALTER TABLE ONLY public.waos
    ADD CONSTRAINT waos_wao_fkey FOREIGN KEY (wao) REFERENCES public.series(serie_id);


--
-- PostgreSQL database dump complete
--

