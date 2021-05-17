**GET - /series**

Return all series

Params available:

- sort?: "rating" | "serie_name" | "serie_id"
- filter?: "asc" | "desc"
- platform_id?: number
- tag_id?: number
- wao?: boolean

**GET - /serie/:serie_id**

Return a serie

**GET - /platforms**

Return all platforms

Params available:

- sort?: "platform_name" | "platform_id"
- filter?: "asc" | "desc"

**GET - /platform/:platform_id**

Return a specific platform

**GET - /tags**

Return all tags

Params available:

- sort?: "tag_name" | "tag_id"
- filter?: "asc" | "desc"

**GET - /tag/:tag_id**

Return a specific tag

**GET - /waos**

Return all waos

Params available:

- sort?: "rating" | "serie_name" | "serie_id"
- filter?: "asc" | "desc"
