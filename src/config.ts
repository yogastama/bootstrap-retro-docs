export const SITE = {
	title: 'Bootstrap Retro',
	description: 'Your website description.',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/tree/main/examples/docs`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Section Header': [
			{ text: 'Introduction', link: 'en/introduction' },
		],
		'Content': [
			{ text: 'Typography', link: 'en/typography' },
			{ text: 'Images', link: 'en/images' },
			{ text: 'Tables', link: 'en/tables' },
			{ text: 'Figures', link: 'en/figures' },
		],
		'Forms': [
			{ text: 'Overview', link: 'en/overview_form' },
			{ text: 'Form control', link: 'en/form_control' },
			{ text: 'Select', link: 'en/select' },
			{ text: 'Check & radios', link: 'en/check_radios' },
			{ text: 'Range', link: 'en/range' },
			{ text: 'Input group', link: 'en/input_group' },
			{ text: 'Floating labels', link: 'en/floating_labels' },
			{ text: 'Layout', link: 'en/layout' },
			{ text: 'Validation', link: 'en/validation' },
		],
		'Components': [
			{ text: 'Accordion', link: 'en/accordion' },
		],
	},
};
