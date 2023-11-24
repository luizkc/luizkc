import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const URLSchema = z.object({
  id: z.string(),
  type: z.literal("url"),
  url: z.string().url(),
});

export type URL = z.infer<typeof URLSchema>;

export const TextSchema = z.object({
  content: z.string(),
  link: z.string().nullable(),
});

export const AnnotationsSchema = z.object({
  bold: z.boolean(),
  italic: z.boolean(),
  strikethrough: z.boolean(),
  underline: z.boolean(),
  code: z.boolean(),
  color: z.string(),
});

export const RichTextArraySchema = z.array(
  z.object({
    type: z.literal("text"),
    text: z.object({
      content: z.string(),
      link: z.string().url().optional().nullable(),
    }),
    annotations: AnnotationsSchema,
    plain_text: z.string(),
    href: z.string().url().optional().nullable(),
  }),
);

export const RichTextSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["rich_text", "text"]),
  rich_text: RichTextArraySchema,
});

export type RichText = z.infer<typeof RichTextSchema>;

export const CheckboxSchema = z.object({
  id: z.string(),
  type: z.literal("checkbox"),
  checkbox: z.boolean(),
});

export type Checkbox = z.infer<typeof CheckboxSchema>;

const NameSchema = z.object({
  id: z.literal("title"),
  type: z.literal("title"),
  title: RichTextArraySchema,
});

export type Name = z.infer<typeof NameSchema>;

export const CreatedTimeSchema = z.object({
  id: z.string(),
  type: z.literal("created_time"),
  created_time: z.string().datetime(),
});

export type CreatedTime = z.infer<typeof CreatedTimeSchema>;

const ProjectPropsSchema = z.object({
  URL: URLSchema,
  "Created time": CreatedTimeSchema,
  title: RichTextSchema,
  Description: RichTextSchema,
  Published: CheckboxSchema,
  Name: NameSchema,
});

export type ProjectProps = z.infer<typeof ProjectPropsSchema>;

export const ProjectsSchema = z.array(ProjectPropsSchema);

export type Projects = z.infer<typeof ProjectsSchema>;

export const ProjectUISchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export type ProjectUI = z.infer<typeof ProjectUISchema>;

const userSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
});

const externalSchema = z.object({
  url: z.string(),
});

const coverSchema = z.object({
  type: z.enum(["external", "file"]),
  external: externalSchema.optional(),
  file: externalSchema.optional(),
});

const parentSchema = z.object({
  type: z.literal("database_id"),
  database_id: z.string(),
});

const SlugSchema = z.object({
  id: z.string(),
  type: z.literal("formula"),
  formula: z.object({
    type: z.literal("string"),
    string: z.string(),
  }),
});

const BlogPostSchema = z.object({
  Published: CheckboxSchema,
  Created: CreatedTimeSchema,
  Name: NameSchema,
  slug: SlugSchema,
  Description: RichTextSchema,
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const pageSchema = z.array(
  z.object({
    object: z.literal("page"),
    id: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
    created_by: userSchema,
    last_edited_by: userSchema,
    cover: coverSchema,
    icon: z.null(),
    parent: parentSchema,
    archived: z.boolean(),
    properties: BlogPostSchema,
    url: z.string(),
    public_url: z.null(),
  }),
);

export type Page = z.infer<typeof pageSchema>;

export const ArticleListUISchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.string().datetime(),
  slug: z.string(),
  id: z.string(),
  cover: z.string(),
});

export type ArticleListUI = z.infer<typeof ArticleListUISchema>;

export const ArticleUISchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.string().datetime(),
  slug: z.string(),
  id: z.string(),
  cover: z.string(),
});

export type ArticleUI = z.infer<typeof ArticleUISchema>;
