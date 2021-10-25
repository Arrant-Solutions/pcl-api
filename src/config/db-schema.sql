PGDMP     )    ;            	    y            dd8hk4b1uh70sh     13.4 (Ubuntu 13.4-4.pgdg20.04+1)    13.3 �    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    7558331    dd8hk4b1uh70sh    DATABASE     c   CREATE DATABASE dd8hk4b1uh70sh WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE dd8hk4b1uh70sh;
                nctdoqvbfwdsfo    false            .           0    0    DATABASE dd8hk4b1uh70sh    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE dd8hk4b1uh70sh FROM PUBLIC;
                   nctdoqvbfwdsfo    false    4397                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                nctdoqvbfwdsfo    false            /           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   nctdoqvbfwdsfo    false    6            0           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO nctdoqvbfwdsfo;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   nctdoqvbfwdsfo    false    6            1           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO nctdoqvbfwdsfo;
                   postgres    false    847                       1255    23867847    on_update()    FUNCTION     �   CREATE FUNCTION public.on_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$;
 "   DROP FUNCTION public.on_update();
       public          nctdoqvbfwdsfo    false    6                       1259    24584996    authors    TABLE     u  CREATE TABLE public.authors (
    author_id integer NOT NULL,
    title character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    suffix character varying(255),
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT authors_first_name_check CHECK (((first_name)::text <> ''::text)),
    CONSTRAINT authors_last_name_check CHECK (((last_name)::text <> ''::text)),
    CONSTRAINT authors_title_check CHECK (((title)::text <> ''::text))
);
    DROP TABLE public.authors;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    24584994    authors_author_id_seq    SEQUENCE     �   CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.authors_author_id_seq;
       public          nctdoqvbfwdsfo    false    277    6            2           0    0    authors_author_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;
          public          nctdoqvbfwdsfo    false    276                       1259    23867547    branches    TABLE       CREATE TABLE public.branches (
    branch_id integer NOT NULL,
    branch_name character varying(100) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.branches;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867545    branches_branch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.branches_branch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.branches_branch_id_seq;
       public          nctdoqvbfwdsfo    false    6    271            3           0    0    branches_branch_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.branches_branch_id_seq OWNED BY public.branches.branch_id;
          public          nctdoqvbfwdsfo    false    270                       1259    23867533 	   countries    TABLE     k  CREATE TABLE public.countries (
    country_id integer NOT NULL,
    country_name character varying(60) NOT NULL,
    country_abbr character varying(10) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    country_code character varying(10)
);
    DROP TABLE public.countries;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867531    countries_country_id_seq    SEQUENCE     �   CREATE SEQUENCE public.countries_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.countries_country_id_seq;
       public          nctdoqvbfwdsfo    false    269    6            4           0    0    countries_country_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.countries_country_id_seq OWNED BY public.countries.country_id;
          public          nctdoqvbfwdsfo    false    268                       1259    24935211 	   favorites    TABLE     "  CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    resource_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.favorites;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867521    genders    TABLE       CREATE TABLE public.genders (
    gender_id integer NOT NULL,
    gender_name character varying(20) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.genders;
       public         heap    nctdoqvbfwdsfo    false    6            	           1259    23867508    media_types    TABLE       CREATE TABLE public.media_types (
    media_type_id integer NOT NULL,
    media_type_name character varying(10) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.media_types;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867493    resource_availability    TABLE     :  CREATE TABLE public.resource_availability (
    resource_availability_id integer NOT NULL,
    resource_availability_name character varying(20) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 )   DROP TABLE public.resource_availability;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867478    resource_categories    TABLE     0  CREATE TABLE public.resource_categories (
    resource_category_id integer NOT NULL,
    resource_category_name character varying(30) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 '   DROP TABLE public.resource_categories;
       public         heap    nctdoqvbfwdsfo    false    6                        1259    23867463    resource_types    TABLE     #  CREATE TABLE public.resource_types (
    resource_type_id integer NOT NULL,
    resource_type_name character varying(30) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 "   DROP TABLE public.resource_types;
       public         heap    nctdoqvbfwdsfo    false    6            �            1259    23867441 	   resources    TABLE     �  CREATE TABLE public.resources (
    resource_id integer NOT NULL,
    title character varying(250) NOT NULL,
    description character varying(255) NOT NULL,
    author_id integer NOT NULL,
    resource_url character varying(255) NOT NULL,
    user_id integer NOT NULL,
    resource_category_id integer NOT NULL,
    resource_type_id integer NOT NULL,
    resource_availability_id integer NOT NULL,
    media_type_id integer NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    thumbnail_url character varying(255) NOT NULL
);
    DROP TABLE public.resources;
       public         heap    nctdoqvbfwdsfo    false    6            5           0    0    COLUMN resources.resource_url    COMMENT     T   COMMENT ON COLUMN public.resources.resource_url IS 'user who created the resource';
          public          nctdoqvbfwdsfo    false    253            �            1259    23867419    user_branch_pivot    TABLE     1  CREATE TABLE public.user_branch_pivot (
    user_branch_pivot_id integer NOT NULL,
    user_id integer NOT NULL,
    branch_id integer NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 %   DROP TABLE public.user_branch_pivot;
       public         heap    nctdoqvbfwdsfo    false    6            �            1259    23867400    user_groups    TABLE     `  CREATE TABLE public.user_groups (
    user_group_id integer DEFAULT nextval('digital_library.usergroups_user_group_id_seq'::regclass) NOT NULL,
    user_group_name character varying NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.user_groups;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    23867998    user_statuses    TABLE       CREATE TABLE public.user_statuses (
    user_status_id integer NOT NULL,
    user_status_name character varying NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public.user_statuses;
       public         heap    nctdoqvbfwdsfo    false    6            �            1259    23867384    users    TABLE     Q  CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(190) NOT NULL,
    phone character varying(30),
    date_of_birth date NOT NULL,
    gender_id integer NOT NULL,
    country_id integer NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    avatar character varying(255),
    user_group_id integer NOT NULL,
    user_status_id integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    nctdoqvbfwdsfo    false    6                       1259    24686572 	   user_view    VIEW     ]  CREATE VIEW public.user_view AS
 SELECT u.avatar,
    u.user_id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.date_of_birth,
    u.created_at,
    u.updated_at,
    ug.user_group_name,
    ug.user_group_id,
    us.user_status_id,
    us.user_status_name,
    b.branch_name,
    b.branch_id,
    c.country_name,
    c.country_id,
    c.country_abbr,
    g.gender_name,
    g.gender_id
   FROM ((((((public.users u
     JOIN public.countries c ON ((u.country_id = c.country_id)))
     JOIN public.genders g ON ((u.gender_id = g.gender_id)))
     JOIN public.user_groups ug ON ((u.user_group_id = ug.user_group_id)))
     JOIN public.user_statuses us ON ((u.user_status_id = us.user_status_id)))
     LEFT JOIN public.user_branch_pivot ubp ON ((u.user_id = ubp.user_id)))
     LEFT JOIN public.branches b ON ((ubp.branch_id = b.branch_id)));
    DROP VIEW public.user_view;
       public          nctdoqvbfwdsfo    false    242    242    246    246    267    267    269    269    269    271    271    273    273    241    241    241    241    241    241    241    241    241    241    241    241    241    6                       1259    24936288    favorites_view    VIEW     �  CREATE VIEW public.favorites_view AS
 SELECT f.favorite_id,
    r.resource_id,
    r.title,
    r.description,
    r.resource_url,
    r.thumbnail_url,
    r.created_at,
    r.updated_at,
    a.author_id,
    a.title AS author_title,
    a.first_name AS author_first_name,
    a.last_name AS author_last_name,
    a.suffix AS author_suffix,
    uv.user_id,
    uv.first_name,
    uv.last_name,
    uv.email,
    uv.phone,
    uv.date_of_birth,
    uv.user_group_name,
    uv.user_group_id,
    uv.branch_name,
    uv.branch_id,
    uv.country_name,
    uv.country_id,
    uv.country_abbr,
    uv.gender_name,
    uv.gender_id,
    uv.user_status_id,
    uv.user_status_name,
    rc.resource_category_id,
    rc.resource_category_name,
    rt.resource_type_id,
    rt.resource_type_name,
    ra.resource_availability_id,
    ra.resource_availability_name,
    mt.media_type_id,
    mt.media_type_name
   FROM public.favorites f,
    public.resources r,
    public.media_types mt,
    public.resource_availability ra,
    public.resource_categories rc,
    public.resource_types rt,
    public.user_view uv,
    public.authors a
  WHERE ((f.resource_id = r.resource_id) AND (r.media_type_id = mt.media_type_id) AND (r.resource_availability_id = ra.resource_availability_id) AND (r.resource_category_id = rc.resource_category_id) AND (r.resource_type_id = rt.resource_type_id) AND (r.user_id = r.user_id) AND (r.author_id = a.author_id) AND (f.user_id = uv.user_id));
 !   DROP VIEW public.favorites_view;
       public          nctdoqvbfwdsfo    false    283    253    283    283    278    278    278    278    278    278    278    278    278    278    278    278    278    278    278    278    278    277    277    277    277    277    265    265    262    262    259    259    256    256    253    253    253    253    253    253    253    253    253    253    253    253    6                       1259    24935205    favourites_favorite_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favourites_favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.favourites_favorite_id_seq;
       public          nctdoqvbfwdsfo    false    283    6            6           0    0    favourites_favorite_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.favourites_favorite_id_seq OWNED BY public.favorites.favorite_id;
          public          nctdoqvbfwdsfo    false    280                       1259    24935207    favourites_resource_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favourites_resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.favourites_resource_id_seq;
       public          nctdoqvbfwdsfo    false    6    283            7           0    0    favourites_resource_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.favourites_resource_id_seq OWNED BY public.favorites.resource_id;
          public          nctdoqvbfwdsfo    false    281                       1259    24935209    favourites_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favourites_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.favourites_user_id_seq;
       public          nctdoqvbfwdsfo    false    6    283            8           0    0    favourites_user_id_seq    SEQUENCE OWNED BY     P   ALTER SEQUENCE public.favourites_user_id_seq OWNED BY public.favorites.user_id;
          public          nctdoqvbfwdsfo    false    282            
           1259    23867519    genders_gender_id_seq    SEQUENCE     �   CREATE SEQUENCE public.genders_gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.genders_gender_id_seq;
       public          nctdoqvbfwdsfo    false    6    267            9           0    0    genders_gender_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.genders_gender_id_seq OWNED BY public.genders.gender_id;
          public          nctdoqvbfwdsfo    false    266                       1259    23867504    media_types_media_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.media_types_media_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.media_types_media_type_id_seq;
       public          nctdoqvbfwdsfo    false    6    265            :           0    0    media_types_media_type_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.media_types_media_type_id_seq OWNED BY public.media_types.media_type_id;
          public          nctdoqvbfwdsfo    false    263                       1259    23867506    media_types_media_type_name_seq    SEQUENCE     �   CREATE SEQUENCE public.media_types_media_type_name_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.media_types_media_type_name_seq;
       public          nctdoqvbfwdsfo    false    6    265            ;           0    0    media_types_media_type_name_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.media_types_media_type_name_seq OWNED BY public.media_types.media_type_name;
          public          nctdoqvbfwdsfo    false    264                       1259    23867489 2   resource_availability_resource_availability_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_availability_resource_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public.resource_availability_resource_availability_id_seq;
       public          nctdoqvbfwdsfo    false    6    262            <           0    0 2   resource_availability_resource_availability_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.resource_availability_resource_availability_id_seq OWNED BY public.resource_availability.resource_availability_id;
          public          nctdoqvbfwdsfo    false    260                       1259    23867491 4   resource_availability_resource_availability_name_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_availability_resource_availability_name_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 K   DROP SEQUENCE public.resource_availability_resource_availability_name_seq;
       public          nctdoqvbfwdsfo    false    6    262            =           0    0 4   resource_availability_resource_availability_name_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.resource_availability_resource_availability_name_seq OWNED BY public.resource_availability.resource_availability_name;
          public          nctdoqvbfwdsfo    false    261                       1259    23867474 ,   resource_categories_resource_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_categories_resource_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.resource_categories_resource_category_id_seq;
       public          nctdoqvbfwdsfo    false    6    259            >           0    0 ,   resource_categories_resource_category_id_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public.resource_categories_resource_category_id_seq OWNED BY public.resource_categories.resource_category_id;
          public          nctdoqvbfwdsfo    false    257                       1259    23867476 .   resource_categories_resource_category_name_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_categories_resource_category_name_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public.resource_categories_resource_category_name_seq;
       public          nctdoqvbfwdsfo    false    259    6            ?           0    0 .   resource_categories_resource_category_name_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.resource_categories_resource_category_name_seq OWNED BY public.resource_categories.resource_category_name;
          public          nctdoqvbfwdsfo    false    258            �            1259    23867459 #   resource_types_resource_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_types_resource_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.resource_types_resource_type_id_seq;
       public          nctdoqvbfwdsfo    false    6    256            @           0    0 #   resource_types_resource_type_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.resource_types_resource_type_id_seq OWNED BY public.resource_types.resource_type_id;
          public          nctdoqvbfwdsfo    false    254            �            1259    23867461 %   resource_types_resource_type_name_seq    SEQUENCE     �   CREATE SEQUENCE public.resource_types_resource_type_name_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.resource_types_resource_type_name_seq;
       public          nctdoqvbfwdsfo    false    256    6            A           0    0 %   resource_types_resource_type_name_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.resource_types_resource_type_name_seq OWNED BY public.resource_types.resource_type_name;
          public          nctdoqvbfwdsfo    false    255                       1259    24686593    resource_view    VIEW     i  CREATE VIEW public.resource_view AS
 SELECT r.resource_id,
    r.title,
    r.description,
    r.resource_url,
    r.thumbnail_url,
    r.created_at,
    r.updated_at,
    a.author_id,
    a.title AS author_title,
    a.first_name AS author_first_name,
    a.last_name AS author_last_name,
    a.suffix AS author_suffix,
    uv.user_id,
    uv.first_name,
    uv.last_name,
    uv.email,
    uv.phone,
    uv.date_of_birth,
    uv.user_group_name,
    uv.user_group_id,
    uv.branch_name,
    uv.branch_id,
    uv.country_name,
    uv.country_id,
    uv.country_abbr,
    uv.gender_name,
    uv.gender_id,
    uv.user_status_id,
    uv.user_status_name,
    rc.resource_category_id,
    rc.resource_category_name,
    rt.resource_type_id,
    rt.resource_type_name,
    ra.resource_availability_id,
    ra.resource_availability_name,
    mt.media_type_id,
    mt.media_type_name
   FROM public.resources r,
    public.media_types mt,
    public.resource_availability ra,
    public.resource_categories rc,
    public.resource_types rt,
    public.user_view uv,
    public.authors a
  WHERE ((r.media_type_id = mt.media_type_id) AND (r.resource_availability_id = ra.resource_availability_id) AND (r.resource_category_id = rc.resource_category_id) AND (r.resource_type_id = rt.resource_type_id) AND (r.user_id = r.user_id) AND (r.author_id = a.author_id) AND (r.user_id = uv.user_id));
     DROP VIEW public.resource_view;
       public          nctdoqvbfwdsfo    false    253    253    253    278    278    278    278    278    278    278    278    278    278    278    278    278    278    278    277    277    277    277    277    265    265    262    262    259    259    256    256    253    253    253    253    253    278    278    253    253    253    253    253    6            �            1259    23867439    resources_media_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_media_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.resources_media_type_id_seq;
       public          nctdoqvbfwdsfo    false    6    253            B           0    0    resources_media_type_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.resources_media_type_id_seq OWNED BY public.resources.media_type_id;
          public          nctdoqvbfwdsfo    false    252            �            1259    23867437 &   resources_resource_availability_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_resource_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.resources_resource_availability_id_seq;
       public          nctdoqvbfwdsfo    false    6    253            C           0    0 &   resources_resource_availability_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.resources_resource_availability_id_seq OWNED BY public.resources.resource_availability_id;
          public          nctdoqvbfwdsfo    false    251            �            1259    23867433 "   resources_resource_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_resource_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.resources_resource_category_id_seq;
       public          nctdoqvbfwdsfo    false    253    6            D           0    0 "   resources_resource_category_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.resources_resource_category_id_seq OWNED BY public.resources.resource_category_id;
          public          nctdoqvbfwdsfo    false    249            �            1259    23867429    resources_resource_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.resources_resource_id_seq;
       public          nctdoqvbfwdsfo    false    6    253            E           0    0    resources_resource_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.resources_resource_id_seq OWNED BY public.resources.resource_id;
          public          nctdoqvbfwdsfo    false    247            �            1259    23867435    resources_resource_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_resource_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.resources_resource_type_id_seq;
       public          nctdoqvbfwdsfo    false    253    6            F           0    0    resources_resource_type_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.resources_resource_type_id_seq OWNED BY public.resources.resource_type_id;
          public          nctdoqvbfwdsfo    false    250            �            1259    23867431    resources_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.resources_user_id_seq;
       public          nctdoqvbfwdsfo    false    6    253            G           0    0    resources_user_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.resources_user_id_seq OWNED BY public.resources.user_id;
          public          nctdoqvbfwdsfo    false    248            �            1259    23867417    user_branch_pivot_branch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_branch_pivot_branch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.user_branch_pivot_branch_id_seq;
       public          nctdoqvbfwdsfo    false    6    246            H           0    0    user_branch_pivot_branch_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.user_branch_pivot_branch_id_seq OWNED BY public.user_branch_pivot.branch_id;
          public          nctdoqvbfwdsfo    false    245            �            1259    23867413 *   user_branch_pivot_user_branch_pivot_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_branch_pivot_user_branch_pivot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.user_branch_pivot_user_branch_pivot_id_seq;
       public          nctdoqvbfwdsfo    false    246    6            I           0    0 *   user_branch_pivot_user_branch_pivot_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.user_branch_pivot_user_branch_pivot_id_seq OWNED BY public.user_branch_pivot.user_branch_pivot_id;
          public          nctdoqvbfwdsfo    false    243            �            1259    23867415    user_branch_pivot_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_branch_pivot_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.user_branch_pivot_user_id_seq;
       public          nctdoqvbfwdsfo    false    6    246            J           0    0    user_branch_pivot_user_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.user_branch_pivot_user_id_seq OWNED BY public.user_branch_pivot.user_id;
          public          nctdoqvbfwdsfo    false    244                       1259    23867996     user_statuses_user_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_statuses_user_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.user_statuses_user_status_id_seq;
       public          nctdoqvbfwdsfo    false    273    6            K           0    0     user_statuses_user_status_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.user_statuses_user_status_id_seq OWNED BY public.user_statuses.user_status_id;
          public          nctdoqvbfwdsfo    false    272            �            1259    23867382    users_country_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.users_country_id_seq;
       public          nctdoqvbfwdsfo    false    6    241            L           0    0    users_country_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.users_country_id_seq OWNED BY public.users.country_id;
          public          nctdoqvbfwdsfo    false    240            �            1259    23867380    users_gender_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_gender_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.users_gender_id_seq;
       public          nctdoqvbfwdsfo    false    241    6            M           0    0    users_gender_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.users_gender_id_seq OWNED BY public.users.gender_id;
          public          nctdoqvbfwdsfo    false    239                       1259    24579126    users_user_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.users_user_group_id_seq;
       public          nctdoqvbfwdsfo    false    6    241            N           0    0    users_user_group_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.users_user_group_id_seq OWNED BY public.users.user_group_id;
          public          nctdoqvbfwdsfo    false    274            �            1259    23867376    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          nctdoqvbfwdsfo    false    6    241            O           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          nctdoqvbfwdsfo    false    238                       1259    24579139    users_user_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.users_user_status_id_seq;
       public          nctdoqvbfwdsfo    false    241    6            P           0    0    users_user_status_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.users_user_status_id_seq OWNED BY public.users.user_status_id;
          public          nctdoqvbfwdsfo    false    275                       2604    24584999    authors author_id    DEFAULT     v   ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);
 @   ALTER TABLE public.authors ALTER COLUMN author_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    277    276    277                       2604    23867550    branches branch_id    DEFAULT     x   ALTER TABLE ONLY public.branches ALTER COLUMN branch_id SET DEFAULT nextval('public.branches_branch_id_seq'::regclass);
 A   ALTER TABLE public.branches ALTER COLUMN branch_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    271    270    271                       2604    23867536    countries country_id    DEFAULT     |   ALTER TABLE ONLY public.countries ALTER COLUMN country_id SET DEFAULT nextval('public.countries_country_id_seq'::regclass);
 C   ALTER TABLE public.countries ALTER COLUMN country_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    268    269    269                       2604    24935214    favorites favorite_id    DEFAULT        ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favourites_favorite_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    280    283    283                       2604    24935215    favorites resource_id    DEFAULT        ALTER TABLE ONLY public.favorites ALTER COLUMN resource_id SET DEFAULT nextval('public.favourites_resource_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN resource_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    281    283    283                       2604    24935216    favorites user_id    DEFAULT     w   ALTER TABLE ONLY public.favorites ALTER COLUMN user_id SET DEFAULT nextval('public.favourites_user_id_seq'::regclass);
 @   ALTER TABLE public.favorites ALTER COLUMN user_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    282    283    283            �           2604    23867524    genders gender_id    DEFAULT     v   ALTER TABLE ONLY public.genders ALTER COLUMN gender_id SET DEFAULT nextval('public.genders_gender_id_seq'::regclass);
 @   ALTER TABLE public.genders ALTER COLUMN gender_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    266    267    267            �           2604    23867511    media_types media_type_id    DEFAULT     �   ALTER TABLE ONLY public.media_types ALTER COLUMN media_type_id SET DEFAULT nextval('public.media_types_media_type_id_seq'::regclass);
 H   ALTER TABLE public.media_types ALTER COLUMN media_type_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    263    265    265            �           2604    23898597    media_types media_type_name    DEFAULT     �   ALTER TABLE ONLY public.media_types ALTER COLUMN media_type_name SET DEFAULT nextval('public.media_types_media_type_name_seq'::regclass);
 J   ALTER TABLE public.media_types ALTER COLUMN media_type_name DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    265    264    265            �           2604    23867496 .   resource_availability resource_availability_id    DEFAULT     �   ALTER TABLE ONLY public.resource_availability ALTER COLUMN resource_availability_id SET DEFAULT nextval('public.resource_availability_resource_availability_id_seq'::regclass);
 ]   ALTER TABLE public.resource_availability ALTER COLUMN resource_availability_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    262    260    262            �           2604    23898608 0   resource_availability resource_availability_name    DEFAULT     �   ALTER TABLE ONLY public.resource_availability ALTER COLUMN resource_availability_name SET DEFAULT nextval('public.resource_availability_resource_availability_name_seq'::regclass);
 _   ALTER TABLE public.resource_availability ALTER COLUMN resource_availability_name DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    262    261    262            �           2604    23867481 (   resource_categories resource_category_id    DEFAULT     �   ALTER TABLE ONLY public.resource_categories ALTER COLUMN resource_category_id SET DEFAULT nextval('public.resource_categories_resource_category_id_seq'::regclass);
 W   ALTER TABLE public.resource_categories ALTER COLUMN resource_category_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    257    259    259            �           2604    23898619 *   resource_categories resource_category_name    DEFAULT     �   ALTER TABLE ONLY public.resource_categories ALTER COLUMN resource_category_name SET DEFAULT nextval('public.resource_categories_resource_category_name_seq'::regclass);
 Y   ALTER TABLE public.resource_categories ALTER COLUMN resource_category_name DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    259    258    259            �           2604    23867466    resource_types resource_type_id    DEFAULT     �   ALTER TABLE ONLY public.resource_types ALTER COLUMN resource_type_id SET DEFAULT nextval('public.resource_types_resource_type_id_seq'::regclass);
 N   ALTER TABLE public.resource_types ALTER COLUMN resource_type_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    254    256    256            �           2604    23898630 !   resource_types resource_type_name    DEFAULT     �   ALTER TABLE ONLY public.resource_types ALTER COLUMN resource_type_name SET DEFAULT nextval('public.resource_types_resource_type_name_seq'::regclass);
 P   ALTER TABLE public.resource_types ALTER COLUMN resource_type_name DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    256    255    256            �           2604    23867444    resources resource_id    DEFAULT     ~   ALTER TABLE ONLY public.resources ALTER COLUMN resource_id SET DEFAULT nextval('public.resources_resource_id_seq'::regclass);
 D   ALTER TABLE public.resources ALTER COLUMN resource_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    253    247    253            �           2604    23867445    resources user_id    DEFAULT     v   ALTER TABLE ONLY public.resources ALTER COLUMN user_id SET DEFAULT nextval('public.resources_user_id_seq'::regclass);
 @   ALTER TABLE public.resources ALTER COLUMN user_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    248    253    253            �           2604    23867446    resources resource_category_id    DEFAULT     �   ALTER TABLE ONLY public.resources ALTER COLUMN resource_category_id SET DEFAULT nextval('public.resources_resource_category_id_seq'::regclass);
 M   ALTER TABLE public.resources ALTER COLUMN resource_category_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    249    253    253            �           2604    23867447    resources resource_type_id    DEFAULT     �   ALTER TABLE ONLY public.resources ALTER COLUMN resource_type_id SET DEFAULT nextval('public.resources_resource_type_id_seq'::regclass);
 I   ALTER TABLE public.resources ALTER COLUMN resource_type_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    250    253    253            �           2604    23867448 "   resources resource_availability_id    DEFAULT     �   ALTER TABLE ONLY public.resources ALTER COLUMN resource_availability_id SET DEFAULT nextval('public.resources_resource_availability_id_seq'::regclass);
 Q   ALTER TABLE public.resources ALTER COLUMN resource_availability_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    251    253    253            �           2604    23867449    resources media_type_id    DEFAULT     �   ALTER TABLE ONLY public.resources ALTER COLUMN media_type_id SET DEFAULT nextval('public.resources_media_type_id_seq'::regclass);
 F   ALTER TABLE public.resources ALTER COLUMN media_type_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    253    252    253            �           2604    23867422 &   user_branch_pivot user_branch_pivot_id    DEFAULT     �   ALTER TABLE ONLY public.user_branch_pivot ALTER COLUMN user_branch_pivot_id SET DEFAULT nextval('public.user_branch_pivot_user_branch_pivot_id_seq'::regclass);
 U   ALTER TABLE public.user_branch_pivot ALTER COLUMN user_branch_pivot_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    243    246    246            �           2604    23867423    user_branch_pivot user_id    DEFAULT     �   ALTER TABLE ONLY public.user_branch_pivot ALTER COLUMN user_id SET DEFAULT nextval('public.user_branch_pivot_user_id_seq'::regclass);
 H   ALTER TABLE public.user_branch_pivot ALTER COLUMN user_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    246    244    246            �           2604    23867424    user_branch_pivot branch_id    DEFAULT     �   ALTER TABLE ONLY public.user_branch_pivot ALTER COLUMN branch_id SET DEFAULT nextval('public.user_branch_pivot_branch_id_seq'::regclass);
 J   ALTER TABLE public.user_branch_pivot ALTER COLUMN branch_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    245    246    246                       2604    23868001    user_statuses user_status_id    DEFAULT     �   ALTER TABLE ONLY public.user_statuses ALTER COLUMN user_status_id SET DEFAULT nextval('public.user_statuses_user_status_id_seq'::regclass);
 K   ALTER TABLE public.user_statuses ALTER COLUMN user_status_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    272    273    273            �           2604    23867387    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    238    241    241            �           2604    23867389    users gender_id    DEFAULT     r   ALTER TABLE ONLY public.users ALTER COLUMN gender_id SET DEFAULT nextval('public.users_gender_id_seq'::regclass);
 >   ALTER TABLE public.users ALTER COLUMN gender_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    239    241    241            �           2604    23867390    users country_id    DEFAULT     t   ALTER TABLE ONLY public.users ALTER COLUMN country_id SET DEFAULT nextval('public.users_country_id_seq'::regclass);
 ?   ALTER TABLE public.users ALTER COLUMN country_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    240    241    241            �           2604    24579128    users user_group_id    DEFAULT     z   ALTER TABLE ONLY public.users ALTER COLUMN user_group_id SET DEFAULT nextval('public.users_user_group_id_seq'::regclass);
 B   ALTER TABLE public.users ALTER COLUMN user_group_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    274    241            �           2604    24579141    users user_status_id    DEFAULT     |   ALTER TABLE ONLY public.users ALTER COLUMN user_status_id SET DEFAULT nextval('public.users_user_status_id_seq'::regclass);
 C   ALTER TABLE public.users ALTER COLUMN user_status_id DROP DEFAULT;
       public          nctdoqvbfwdsfo    false    275    241            #          0    24584996    authors 
   TABLE DATA           j   COPY public.authors (author_id, title, first_name, last_name, suffix, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    277                      0    23867547    branches 
   TABLE DATA           R   COPY public.branches (branch_id, branch_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    271                      0    23867533 	   countries 
   TABLE DATA           q   COPY public.countries (country_id, country_name, country_abbr, created_at, updated_at, country_code) FROM stdin;
    public          nctdoqvbfwdsfo    false    269            '          0    24935211 	   favorites 
   TABLE DATA           ^   COPY public.favorites (favorite_id, resource_id, user_id, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    283                      0    23867521    genders 
   TABLE DATA           Q   COPY public.genders (gender_id, gender_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    267                      0    23867508    media_types 
   TABLE DATA           ]   COPY public.media_types (media_type_id, media_type_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    265                      0    23867493    resource_availability 
   TABLE DATA           }   COPY public.resource_availability (resource_availability_id, resource_availability_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    262                      0    23867478    resource_categories 
   TABLE DATA           s   COPY public.resource_categories (resource_category_id, resource_category_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    259                      0    23867463    resource_types 
   TABLE DATA           f   COPY public.resource_types (resource_type_id, resource_type_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    256                      0    23867441 	   resources 
   TABLE DATA           �   COPY public.resources (resource_id, title, description, author_id, resource_url, user_id, resource_category_id, resource_type_id, resource_availability_id, media_type_id, created_at, updated_at, thumbnail_url) FROM stdin;
    public          nctdoqvbfwdsfo    false    253                      0    23867419    user_branch_pivot 
   TABLE DATA           m   COPY public.user_branch_pivot (user_branch_pivot_id, user_id, branch_id, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    246                       0    23867400    user_groups 
   TABLE DATA           ]   COPY public.user_groups (user_group_id, user_group_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    242                      0    23867998    user_statuses 
   TABLE DATA           a   COPY public.user_statuses (user_status_id, user_status_name, created_at, updated_at) FROM stdin;
    public          nctdoqvbfwdsfo    false    273            �          0    23867384    users 
   TABLE DATA           �   COPY public.users (user_id, first_name, last_name, email, phone, date_of_birth, gender_id, country_id, created_at, updated_at, avatar, user_group_id, user_status_id) FROM stdin;
    public          nctdoqvbfwdsfo    false    241            Q           0    0    authors_author_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.authors_author_id_seq', 1, true);
          public          nctdoqvbfwdsfo    false    276            R           0    0    branches_branch_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.branches_branch_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    270            S           0    0    countries_country_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.countries_country_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    268            T           0    0    favourites_favorite_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favourites_favorite_id_seq', 19, true);
          public          nctdoqvbfwdsfo    false    280            U           0    0    favourites_resource_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favourites_resource_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    281            V           0    0    favourites_user_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.favourites_user_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    282            W           0    0    genders_gender_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.genders_gender_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    266            X           0    0    media_types_media_type_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.media_types_media_type_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    263            Y           0    0    media_types_media_type_name_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.media_types_media_type_name_seq', 1, false);
          public          nctdoqvbfwdsfo    false    264            Z           0    0 2   resource_availability_resource_availability_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public.resource_availability_resource_availability_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    260            [           0    0 4   resource_availability_resource_availability_name_seq    SEQUENCE SET     c   SELECT pg_catalog.setval('public.resource_availability_resource_availability_name_seq', 1, false);
          public          nctdoqvbfwdsfo    false    261            \           0    0 ,   resource_categories_resource_category_id_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public.resource_categories_resource_category_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    257            ]           0    0 .   resource_categories_resource_category_name_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.resource_categories_resource_category_name_seq', 1, false);
          public          nctdoqvbfwdsfo    false    258            ^           0    0 #   resource_types_resource_type_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.resource_types_resource_type_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    254            _           0    0 %   resource_types_resource_type_name_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.resource_types_resource_type_name_seq', 1, false);
          public          nctdoqvbfwdsfo    false    255            `           0    0    resources_media_type_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.resources_media_type_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    252            a           0    0 &   resources_resource_availability_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.resources_resource_availability_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    251            b           0    0 "   resources_resource_category_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.resources_resource_category_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    249            c           0    0    resources_resource_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.resources_resource_id_seq', 12, true);
          public          nctdoqvbfwdsfo    false    247            d           0    0    resources_resource_type_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.resources_resource_type_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    250            e           0    0    resources_user_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.resources_user_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    248            f           0    0    user_branch_pivot_branch_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.user_branch_pivot_branch_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    245            g           0    0 *   user_branch_pivot_user_branch_pivot_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.user_branch_pivot_user_branch_pivot_id_seq', 11, true);
          public          nctdoqvbfwdsfo    false    243            h           0    0    user_branch_pivot_user_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.user_branch_pivot_user_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    244            i           0    0     user_statuses_user_status_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.user_statuses_user_status_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    272            j           0    0    users_country_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.users_country_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    240            k           0    0    users_gender_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.users_gender_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    239            l           0    0    users_user_group_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.users_user_group_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    274            m           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 13, true);
          public          nctdoqvbfwdsfo    false    238            n           0    0    users_user_status_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.users_user_status_id_seq', 1, false);
          public          nctdoqvbfwdsfo    false    275            a           2606    24585009    authors author_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT author_pk PRIMARY KEY (author_id);
 ;   ALTER TABLE ONLY public.authors DROP CONSTRAINT author_pk;
       public            nctdoqvbfwdsfo    false    277            c           2606    24585011    authors author_un 
   CONSTRAINT     l   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT author_un UNIQUE (title, first_name, last_name, suffix);
 ;   ALTER TABLE ONLY public.authors DROP CONSTRAINT author_un;
       public            nctdoqvbfwdsfo    false    277    277    277    277            W           2606    23867844    branches branches_pk 
   CONSTRAINT     Y   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pk PRIMARY KEY (branch_id);
 >   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_pk;
       public            nctdoqvbfwdsfo    false    271            Y           2606    23867846    branches branches_un 
   CONSTRAINT     V   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_un UNIQUE (branch_name);
 >   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_un;
       public            nctdoqvbfwdsfo    false    271            N           2606    23867852    countries countries_pk 
   CONSTRAINT     \   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pk PRIMARY KEY (country_id);
 @   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pk;
       public            nctdoqvbfwdsfo    false    269            P           2606    23898552    countries countries_un 
   CONSTRAINT     Y   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_un UNIQUE (country_name);
 @   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_un;
       public            nctdoqvbfwdsfo    false    269            R           2606    23867902    countries countries_un_abbr 
   CONSTRAINT     ^   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_un_abbr UNIQUE (country_abbr);
 E   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_un_abbr;
       public            nctdoqvbfwdsfo    false    269            e           2606    24935220    favorites favourites_pk 
   CONSTRAINT     ^   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favourites_pk PRIMARY KEY (favorite_id);
 A   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favourites_pk;
       public            nctdoqvbfwdsfo    false    283            g           2606    24935222    favorites favourites_un 
   CONSTRAINT     b   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favourites_un UNIQUE (resource_id, user_id);
 A   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favourites_un;
       public            nctdoqvbfwdsfo    false    283    283            H           2606    23867904    genders genders_pk 
   CONSTRAINT     W   ALTER TABLE ONLY public.genders
    ADD CONSTRAINT genders_pk PRIMARY KEY (gender_id);
 <   ALTER TABLE ONLY public.genders DROP CONSTRAINT genders_pk;
       public            nctdoqvbfwdsfo    false    267            J           2606    23867906    genders genders_un 
   CONSTRAINT     T   ALTER TABLE ONLY public.genders
    ADD CONSTRAINT genders_un UNIQUE (gender_name);
 <   ALTER TABLE ONLY public.genders DROP CONSTRAINT genders_un;
       public            nctdoqvbfwdsfo    false    267            B           2606    23867908    media_types media_types_pk 
   CONSTRAINT     c   ALTER TABLE ONLY public.media_types
    ADD CONSTRAINT media_types_pk PRIMARY KEY (media_type_id);
 D   ALTER TABLE ONLY public.media_types DROP CONSTRAINT media_types_pk;
       public            nctdoqvbfwdsfo    false    265            D           2606    23898599    media_types media_types_un 
   CONSTRAINT     `   ALTER TABLE ONLY public.media_types
    ADD CONSTRAINT media_types_un UNIQUE (media_type_name);
 D   ALTER TABLE ONLY public.media_types DROP CONSTRAINT media_types_un;
       public            nctdoqvbfwdsfo    false    265            >           2606    23867912 .   resource_availability resource_availability_pk 
   CONSTRAINT     �   ALTER TABLE ONLY public.resource_availability
    ADD CONSTRAINT resource_availability_pk PRIMARY KEY (resource_availability_id);
 X   ALTER TABLE ONLY public.resource_availability DROP CONSTRAINT resource_availability_pk;
       public            nctdoqvbfwdsfo    false    262            @           2606    23898610 .   resource_availability resource_availability_un 
   CONSTRAINT        ALTER TABLE ONLY public.resource_availability
    ADD CONSTRAINT resource_availability_un UNIQUE (resource_availability_name);
 X   ALTER TABLE ONLY public.resource_availability DROP CONSTRAINT resource_availability_un;
       public            nctdoqvbfwdsfo    false    262            8           2606    23867916 *   resource_categories resource_categories_pk 
   CONSTRAINT     z   ALTER TABLE ONLY public.resource_categories
    ADD CONSTRAINT resource_categories_pk PRIMARY KEY (resource_category_id);
 T   ALTER TABLE ONLY public.resource_categories DROP CONSTRAINT resource_categories_pk;
       public            nctdoqvbfwdsfo    false    259            :           2606    23898621 *   resource_categories resource_categories_un 
   CONSTRAINT     w   ALTER TABLE ONLY public.resource_categories
    ADD CONSTRAINT resource_categories_un UNIQUE (resource_category_name);
 T   ALTER TABLE ONLY public.resource_categories DROP CONSTRAINT resource_categories_un;
       public            nctdoqvbfwdsfo    false    259            2           2606    23867920     resource_types resource_types_pk 
   CONSTRAINT     l   ALTER TABLE ONLY public.resource_types
    ADD CONSTRAINT resource_types_pk PRIMARY KEY (resource_type_id);
 J   ALTER TABLE ONLY public.resource_types DROP CONSTRAINT resource_types_pk;
       public            nctdoqvbfwdsfo    false    256            4           2606    23898632     resource_types resource_types_un 
   CONSTRAINT     i   ALTER TABLE ONLY public.resource_types
    ADD CONSTRAINT resource_types_un UNIQUE (resource_type_name);
 J   ALTER TABLE ONLY public.resource_types DROP CONSTRAINT resource_types_un;
       public            nctdoqvbfwdsfo    false    256            *           2606    23867924    resources resources_pk 
   CONSTRAINT     ]   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pk PRIMARY KEY (resource_id);
 @   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_pk;
       public            nctdoqvbfwdsfo    false    253            ,           2606    23926482     resources resources_thumbnail_un 
   CONSTRAINT     d   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_thumbnail_un UNIQUE (thumbnail_url);
 J   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_thumbnail_un;
       public            nctdoqvbfwdsfo    false    253            .           2606    23867926    resources resources_un 
   CONSTRAINT     Y   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_un UNIQUE (resource_url);
 @   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_un;
       public            nctdoqvbfwdsfo    false    253            $           2606    23867958 &   user_branch_pivot user_branch_pivot_pk 
   CONSTRAINT     v   ALTER TABLE ONLY public.user_branch_pivot
    ADD CONSTRAINT user_branch_pivot_pk PRIMARY KEY (user_branch_pivot_id);
 P   ALTER TABLE ONLY public.user_branch_pivot DROP CONSTRAINT user_branch_pivot_pk;
       public            nctdoqvbfwdsfo    false    246            &           2606    23867960 &   user_branch_pivot user_branch_pivot_un 
   CONSTRAINT     o   ALTER TABLE ONLY public.user_branch_pivot
    ADD CONSTRAINT user_branch_pivot_un UNIQUE (user_id, branch_id);
 P   ALTER TABLE ONLY public.user_branch_pivot DROP CONSTRAINT user_branch_pivot_un;
       public            nctdoqvbfwdsfo    false    246    246                       2606    23867928    user_groups user_groups_pk 
   CONSTRAINT     c   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pk PRIMARY KEY (user_group_id);
 D   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT user_groups_pk;
       public            nctdoqvbfwdsfo    false    242            !           2606    23867930    user_groups user_groups_un 
   CONSTRAINT     `   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_un UNIQUE (user_group_name);
 D   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT user_groups_un;
       public            nctdoqvbfwdsfo    false    242            ]           2606    23868008    user_statuses user_statuses_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.user_statuses
    ADD CONSTRAINT user_statuses_pk PRIMARY KEY (user_status_id);
 H   ALTER TABLE ONLY public.user_statuses DROP CONSTRAINT user_statuses_pk;
       public            nctdoqvbfwdsfo    false    273            _           2606    23868010    user_statuses user_statuses_un 
   CONSTRAINT     e   ALTER TABLE ONLY public.user_statuses
    ADD CONSTRAINT user_statuses_un UNIQUE (user_status_name);
 H   ALTER TABLE ONLY public.user_statuses DROP CONSTRAINT user_statuses_un;
       public            nctdoqvbfwdsfo    false    273                       2606    23867934    users users_email_un 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_un UNIQUE (email);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_un;
       public            nctdoqvbfwdsfo    false    241                       2606    23867932    users users_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            nctdoqvbfwdsfo    false    241            Z           1259    23867804    pub_branches_pk    INDEX     P   CREATE UNIQUE INDEX pub_branches_pk ON public.branches USING btree (branch_id);
 #   DROP INDEX public.pub_branches_pk;
       public            nctdoqvbfwdsfo    false    271            [           1259    23867805    pub_branches_un    INDEX     R   CREATE UNIQUE INDEX pub_branches_un ON public.branches USING btree (branch_name);
 #   DROP INDEX public.pub_branches_un;
       public            nctdoqvbfwdsfo    false    271            S           1259    23867806    pub_countries_abbr    INDEX     W   CREATE UNIQUE INDEX pub_countries_abbr ON public.countries USING btree (country_abbr);
 &   DROP INDEX public.pub_countries_abbr;
       public            nctdoqvbfwdsfo    false    269            T           1259    23867807    pub_countries_pk    INDEX     S   CREATE UNIQUE INDEX pub_countries_pk ON public.countries USING btree (country_id);
 $   DROP INDEX public.pub_countries_pk;
       public            nctdoqvbfwdsfo    false    269            U           1259    23898553    pub_countries_un    INDEX     U   CREATE UNIQUE INDEX pub_countries_un ON public.countries USING btree (country_name);
 $   DROP INDEX public.pub_countries_un;
       public            nctdoqvbfwdsfo    false    269            K           1259    23867809    pub_gender_pk    INDEX     M   CREATE UNIQUE INDEX pub_gender_pk ON public.genders USING btree (gender_id);
 !   DROP INDEX public.pub_gender_pk;
       public            nctdoqvbfwdsfo    false    267            L           1259    23867810    pub_gender_un    INDEX     O   CREATE UNIQUE INDEX pub_gender_un ON public.genders USING btree (gender_name);
 !   DROP INDEX public.pub_gender_un;
       public            nctdoqvbfwdsfo    false    267            E           1259    23867811    pub_media_type_pk    INDEX     Y   CREATE UNIQUE INDEX pub_media_type_pk ON public.media_types USING btree (media_type_id);
 %   DROP INDEX public.pub_media_type_pk;
       public            nctdoqvbfwdsfo    false    265            F           1259    23898600    pub_media_type_un    INDEX     [   CREATE UNIQUE INDEX pub_media_type_un ON public.media_types USING btree (media_type_name);
 %   DROP INDEX public.pub_media_type_un;
       public            nctdoqvbfwdsfo    false    265            ;           1259    23867813    pub_resource_availability_pk    INDEX     y   CREATE UNIQUE INDEX pub_resource_availability_pk ON public.resource_availability USING btree (resource_availability_id);
 0   DROP INDEX public.pub_resource_availability_pk;
       public            nctdoqvbfwdsfo    false    262            <           1259    23898611    pub_resource_availability_un    INDEX     {   CREATE UNIQUE INDEX pub_resource_availability_un ON public.resource_availability USING btree (resource_availability_name);
 0   DROP INDEX public.pub_resource_availability_un;
       public            nctdoqvbfwdsfo    false    262            5           1259    23867815    pub_resource_category_pk    INDEX     o   CREATE UNIQUE INDEX pub_resource_category_pk ON public.resource_categories USING btree (resource_category_id);
 ,   DROP INDEX public.pub_resource_category_pk;
       public            nctdoqvbfwdsfo    false    259            6           1259    23898622    pub_resource_category_un    INDEX     q   CREATE UNIQUE INDEX pub_resource_category_un ON public.resource_categories USING btree (resource_category_name);
 ,   DROP INDEX public.pub_resource_category_un;
       public            nctdoqvbfwdsfo    false    259            /           1259    23867817    pub_resource_type_pk    INDEX     b   CREATE UNIQUE INDEX pub_resource_type_pk ON public.resource_types USING btree (resource_type_id);
 (   DROP INDEX public.pub_resource_type_pk;
       public            nctdoqvbfwdsfo    false    256            0           1259    23898633    pub_resource_type_un    INDEX     d   CREATE UNIQUE INDEX pub_resource_type_un ON public.resource_types USING btree (resource_type_name);
 (   DROP INDEX public.pub_resource_type_un;
       public            nctdoqvbfwdsfo    false    256            '           1259    23867819    pub_resources_pk    INDEX     T   CREATE UNIQUE INDEX pub_resources_pk ON public.resources USING btree (resource_id);
 $   DROP INDEX public.pub_resources_pk;
       public            nctdoqvbfwdsfo    false    253            (           1259    23867820    pub_resources_un    INDEX     U   CREATE UNIQUE INDEX pub_resources_un ON public.resources USING btree (resource_url);
 $   DROP INDEX public.pub_resources_un;
       public            nctdoqvbfwdsfo    false    253            "           1259    23867821    pub_user_branch_pivot_pk    INDEX     m   CREATE UNIQUE INDEX pub_user_branch_pivot_pk ON public.user_branch_pivot USING btree (user_branch_pivot_id);
 ,   DROP INDEX public.pub_user_branch_pivot_pk;
       public            nctdoqvbfwdsfo    false    246                       1259    23867822    pub_usergroups_pk    INDEX     Y   CREATE UNIQUE INDEX pub_usergroups_pk ON public.user_groups USING btree (user_group_id);
 %   DROP INDEX public.pub_usergroups_pk;
       public            nctdoqvbfwdsfo    false    242                       1259    23867823    pub_usergroups_un    INDEX     [   CREATE UNIQUE INDEX pub_usergroups_un ON public.user_groups USING btree (user_group_name);
 %   DROP INDEX public.pub_usergroups_un;
       public            nctdoqvbfwdsfo    false    242                       1259    23867824    pub_users_pk    INDEX     H   CREATE UNIQUE INDEX pub_users_pk ON public.users USING btree (user_id);
     DROP INDEX public.pub_users_pk;
       public            nctdoqvbfwdsfo    false    241                       1259    23867825    pub_users_un    INDEX     F   CREATE UNIQUE INDEX pub_users_un ON public.users USING btree (email);
     DROP INDEX public.pub_users_un;
       public            nctdoqvbfwdsfo    false    241            t           2606    24935223    favorites favourites_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favourites_fk FOREIGN KEY (resource_id) REFERENCES public.resources(resource_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 A   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favourites_fk;
       public          nctdoqvbfwdsfo    false    283    4135    253            u           2606    24935228    favorites favourites_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favourites_fk_1 FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favourites_fk_1;
       public          nctdoqvbfwdsfo    false    4118    283    241            s           2606    24585041    resources resources_author_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_author_fk FOREIGN KEY (author_id) REFERENCES public.authors(author_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_author_fk;
       public          nctdoqvbfwdsfo    false    4193    277    253            r           2606    23867991 !   resources resources_created_by_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_created_by_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_created_by_fk;
       public          nctdoqvbfwdsfo    false    241    253    4118            n           2606    23867971 !   resources resources_media_type_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_media_type_fk FOREIGN KEY (media_type_id) REFERENCES public.media_types(media_type_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_media_type_fk;
       public          nctdoqvbfwdsfo    false    253    4165    265            o           2606    23867976 ,   resources resources_resource_availability_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_resource_availability_fk FOREIGN KEY (resource_availability_id) REFERENCES public.resource_availability(resource_availability_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_resource_availability_fk;
       public          nctdoqvbfwdsfo    false    4155    253    262            q           2606    23867986 (   resources resources_resource_category_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_resource_category_fk FOREIGN KEY (resource_category_id) REFERENCES public.resource_categories(resource_category_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_resource_category_fk;
       public          nctdoqvbfwdsfo    false    259    253    4149            p           2606    23867981 $   resources resources_resource_type_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_resource_type_fk FOREIGN KEY (resource_type_id) REFERENCES public.resource_types(resource_type_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_resource_type_fk;
       public          nctdoqvbfwdsfo    false    4143    256    253            l           2606    23867961 &   user_branch_pivot user_branch_pivot_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_branch_pivot
    ADD CONSTRAINT user_branch_pivot_fk FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public.user_branch_pivot DROP CONSTRAINT user_branch_pivot_fk;
       public          nctdoqvbfwdsfo    false    271    246    4186            m           2606    23867966 (   user_branch_pivot user_branch_pivot_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_branch_pivot
    ADD CONSTRAINT user_branch_pivot_fk_1 FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public.user_branch_pivot DROP CONSTRAINT user_branch_pivot_fk_1;
       public          nctdoqvbfwdsfo    false    4118    246    241            h           2606    23867942    users users_countries_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_countries_fk FOREIGN KEY (country_id) REFERENCES public.countries(country_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_countries_fk;
       public          nctdoqvbfwdsfo    false    4180    269    241            k           2606    24579158    users users_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (user_status_id) REFERENCES public.user_statuses(user_status_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_fk;
       public          nctdoqvbfwdsfo    false    273    241    4189            i           2606    23867952    users users_gender_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_gender_fk FOREIGN KEY (gender_id) REFERENCES public.genders(gender_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_gender_fk;
       public          nctdoqvbfwdsfo    false    267    4171    241            j           2606    24579153    users users_group_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_group_fk FOREIGN KEY (user_group_id) REFERENCES public.user_groups(user_group_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_group_fk;
       public          nctdoqvbfwdsfo    false    4124    241    242            #   ;   x�3�t)��t����)OU��39c�8��utLL�LM�L̴ps��qqq �Y         7   x�3�t*J�K�P0�4202�5��54Q00�22�25�60�!�e�hD��=... � �         �  x��\�rɱ]gE�,�g&���� 	R (r,�7�԰��)t������?Џ�d�$�w�wC�����8�y2�J1�}�luc��n��T�⟣��8��/*�K��9���_WI���?jݬ��=�����
A��:�������<R�o����g���� ���W�	�z�0��%��4��Y;�a.�D��7���G��4(ٺ�5�_KG��4� �j�j�t��"/TGa7����X#�p� ���o�@�
!�4� v���T��'}���o���� %�}�u�߿��f����B�4	b��������cK���� �V���bP)�P2�׶���t �P����zm�[H}�,�@E�4�k�I������w �$�Q(����hp!�W�J�ܾH�0��@�0ox>HI��@e��;v�ԅ�4��sl;N-)�+^;0������ݬ�<BAk]��p��ք��{H�eVa\`&p�7?�s۴�\�ݾ�\s�HC`V��8��:=Е�/f�8�Τ�_A��v��@�r ���{2�)?��^�$`��/���8gA{���6�n�)������x���]��]$)�5�5�#���6·��>�f�F������#|w��{���2�$�Ļ_� N���$��n������^���F��� �t�Fs�H�dU��� ��K�w4�*H�� ��;h ]�A�P�좱4є,�\CC)aT�$ h4��P��q��0^��������?URi��N�1���\')"�!$TKx��(�o�c��튆�M���zMi�V	FS���XiM���#l��Q�A�أ(��y�Ci]���n���c�,�l޿m�p���O]�vK}(�{E���n�<��XL�
20աF��4V�̲�u������#߮��\�[�b�@�f�s�w,]��Wd@x��P��"����t%�O�,�@Z.9�҂!K������?�#�
�.A�Y��B��A���~1��5UQ�'tn���t.�ED�<�����u��s���e����l�8���+�����R��{R�ŪC���B0�
�)�bsxl�B�؊�. �u��`.�LY�EDtB�"��:�M#��VP=EL�a�R�R�����}�p!.�
	]�[�@ZͨH�R��7��wS�.���=]JٞEX��ޙ��w)�U9]��-]J&/��(`��)�R�޸�W�t�u�2t)��Wk� �[\%��2%�Ҡ�^Qf�>4f�=�I��
��h��5�[�c͞R̠T4�8lh$�
�w����#q�G (S���R���,(3�{���K�S,fN�m��RQ������]Bʶ��H�LL���7���	몷>z�H�`r1B_V���(NQ�U1��<L��GLb&��(�C�h$U$q^�A��ukv(Qi$�Y��
��F{s��4��iP����#���y~2�y`Qhw47a J*P�;�L�*����t�-͕|�������9��KMW��F�vhs%n���q�`΍�{qo�#�b 4k�V@�;Y�A1�&�]Ih��EBW]���@WR�������W�w�ki�<�c�(��1F��%�������1e]K�D�������&\����Y�r[܄QpJ�F�1�v?�v��ZA!K�b�?�Z��G�>�X���0n3�S�е�GR��צ�ki
��H-N�����������>��Z惸�)�;΀����f��s�`<����ϋW����u�����qIc������XZ���hl����t�?��hl�]jD�ԭ�P1��g�KSO��-����o/�5��Ъ�1$4�.��X�?���ҿ��4�#�@n��&��2���UF���Dz�W�)���w���D�U�3(hb��݃��,Mx%�a�6P1b��`nV��4��X���f�B�K"��ۮ��1ǚ"DL���f�t���D�L9'��z�M�_r�N67k���w���/��?u����cR�JC�/NR|d�7z�Be17V�vI�Z?[��O���I��8�O���y�
X�'T�S��U=B�������V�u�ы��q#�`��[]�ov*�sh�8������34���h�����{��0�x�	�v���y
�8eb\��$nPq�L�J�w���I;�yS�Ү�Q���.�� I|;�e���ʐ�Un
��z� ���/Z�|)�����)m�&����~��n�T��YVd# f���(���rgq��7�LS��5���[�Z�;L1��u/�d��G|�.C�@\��;�R~T��YF7(9��u#�D�
9 :�э�ws�)�tcuM7R�\1����,<Ʊ�H�-V�9�����F|�Xb(y��|6���n��ɋ��t����M�aH�HaCs���t#V݊g��y��9�)�  �o��J�z::��կ�t#�%s��4v��L�D�qp,��2$������S���o�T�4�,�Y�F��R޹�>�P�|��2ZD4�ǻ�3��c1P� �uG3�*�KL�Pln�P|��tG�f��\�J	�T�4�ƴ,�R)�;�C�z�3�7���ȀԻ�f�&#�43�3�;gmEA�����#氧�X��%��f�]i���M)�[����<����,�LxZ�A���/V�5;�[��ͤ�
K R��~�| �S'�2��/l���=9�����)�~�g�X���0�r�����z�}+6�2��n��;�'�ڏE�yY�}90q9ǁ�,i��� ����?k�;�@|�b��uej��³��4{̬��/|õ�]��4���W�����m����d�4�:v5u��&݊R�/��	�Xѡ9��>⯨�'�<��9���x|�Z�Wf�4�E<��yo�M�cr��x��G�{�
�p�*���ߤ9'/���G-�8�˟M��
`�p�v�Śke��5)��+v�nm�3�Y��Ł��t���-�߹�0������l���jkj��KwW!���h�$��ĠȦ����
"�6�iIs� Ȁ����e�+7;��7/�K;PM�> n�����X|�G�{����\|�_�@ s�z��v�v.m*�(�T�"1q{`.������|�t�>��Z�"�N �;oa��[8���b�^�:��/ �8~-R~,H���Ĵcu��C���!�1���o�.Ď����6���iH\C0�|��&ksи鲃w����4~�����y�?��`0"����(xH��3? a�;wxP���~������L*?����"��T��S$�|���$���Ҋ�BA������|��*��c�J`��=���T�V�J�Ѽ� �)<����	i!o��{��[}�셸��崰;���6��f)�#(U��m-������+���*xş� �$Ii��,A�vc�����<��8�l������g!/1d���9�B|��$�9��=�Uܜ�w�Iڣ�����,�5�,�j7�X���BvYz�����9�m���NL��׵��~�j�N���W�|}��Ǥ����=��o[�pI��6��[���)4�J>������z;f$9)�\��<|����g����w}��N�c�f���^��Q��/�#�{�t���^��- �{�/(���ǫ}_��n������.Ѵ��ѽ�M�XN�麶G��ڮA�(��̛U�o�=��	[�5]��12XZ�'��B�ĄϡtҊ>�7�?g��e}���^>�,?�O����� ��g?      '      x������ � �         4   x�3��M�I�4202�5��54Q00�22�2��60�!�e�閚K��=...          B   x�3��-0�4202�5��54Q00�22�24�60�!�e�cB�c΂�4��p��&��)F��� F�(�         7   x�3�t+JM��,��4202�5��54Q00�22�24�60�!�e�PD��=... �O         X   x�3�t,M���4202�5��54Q00�22�24�60�!�e����J�.c�T���lu�p�����'���є3 '�2'���D�1z\\\ �8�         @   x�3�t,M���4202�5��54Q00�22�24�60�!�e����J�.c�T���lu��qqq #Z �         T  x��Xk����,�
~Ia���y?�&�������Z(�$�)PT\���)��X*�M��1G��3��K��G{�n�T�i�����v[�S�W�7�T��_���S��Ŧ�����u����}��:]��v�M��W��]�D����Y6m���ȶ�t�	�W���m?Lm��oۏ���x�o8E� x�

�*`�0�+��@��������:W������]�5��o?��[�mpJ$��
D$(�sH^H\��wi9�0J���\)��揔^����㮁z{��R�	W�٧���1�-K��HÀx�4�"$�9�*�%_�v���ݮnօ��z�v��1�t8 ��_뜞>q=�1�-��+#��"lO`�`S ��p;\�+I����M��J%'��HdҞx-1� ���������+%H���ܒp(��:��q`��£ʩ'.�H�3�Y`�e���8Q[�Blu�yzp^~O�<q[��x���}V�IF��H\8�v�@9T_fQ�$�`�<<7��N�h rР�Q��3� �H��*�������T݄p�O�����������إ�M��f�P��	D!��m����9��,U�7� �D$�SEh�����e��J�	���s�o'�,�`f&!r�"Q�v�b��Y�����z�*w��h<9�{p;\�����o��P�}H���eK�23$
j�M��K��4��'�<�ͤ�dR[��4�D�pSj	Ȝ�N�f˅!.�@�]��l�X���Cs<a[���C����߃����W�ᄡ���s�fH����T�M�I"�CAG�.S��KLP}��j3�ws��d[�#&!�0`���"e��BD�4�Mߢ��Տ�������-ښc�W�r��}{H/�1s^���w��f!��8~<�(�����.�?0�|V��g�h�1�KĪ��%؜�7L��i�ӕd�Eq?<�(�t$��Y�3A�-��,	�T2Z˽�~io�����d�q��$��C��t��R��f��>qI�T�T$�� �1<��`��tY��M�\F�,��nftl�dR�ES����>$\��)����]0�7�D��(�Jybi2� *��[�m?�b��Υ���o`uS�އ���˧N�Wo�ʻ����Ǫ�F8�)1�@�#��x�X!��%�&�<�cqFM ֱ��>�_с�τ��s�@N� ���J��t��8�|L���dtq�[k��7uS����7]}��Cu��"4�u���u_�MU�������G;8��� ��2��e7�<�� uRG�Bb&:��&J%�}11taޒ�#�"Fj��,$�SB:�P.D�1�h�Mч�,5ּ\�S�����dlq�6�ꦉ�+8�AOݡ�]�C��>m���@%j4E�0���C(�	"N(4�軃R�Ȅ{ϗT�SN@0�2�f%'�����܋iS�@�4�!�R'Y\��D��D�l�	n��P5���TȬ�KM���x�޷��T/޾{U}x�ϛ���?�
c���J��GV�P;��� ,eJ��d�Ș�B�N���4�X$�t���]��]I;!����r����^���r��`���	눰�gέ�B-�u�\.ij�_         �   x�uλ�0�᚜�}��Ǉ$�,����ei��1%��x���&-Y���O֒!�ݘ�V�lY��玃X���N9��8l�&+�u	l��Jz6�e=h(����׎75X���mY��hj^���������5�K�          X   x�3�t.-.��M-�4202�5��54Q00�22�24�60�!�e�霟W��W������N�~#N��\�$j5�.-H-R-&��=... 8e4�         ]   x�3�tL.�,K�4202�5��54Q00�22�2��60�!�e�锓����B�>c΀Լ�̼t��Ԣ̴��Ē��<1�t�,NL�!��=... !3�      �   �  x�u��n�0���)r_Q���O�T��J�S����&nq�q�F��kbXC"��0�fl~ۦ������]��]��w�m�p�^~C�2�s `��l�)Q)�o���P!��a?X��lc�?�[����c	�ؖJ��r�%�ȉ���;��Yk�$�EJ�g͛��+����؟��=j8Ľ;SM�)<����R(o�^	ϵw����g؝;ۚ��~���j������ԜţY�Os2���k��~|���zU��S�o�+&���6=	�_M;[�a��q�!��r��<�f��§i����\t���,�,�=�hq�|K�D�X���x	zo�W�[3��&y�C�s%ҁ��	d�vv�S����ctם�n������P�P��tO �'�l;=�����F��l�������*g�(�<l6��7*>     