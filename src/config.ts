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
			{ text: 'Typography', link: 'en/contents/typography' },
			{ text: 'Images', link: 'en/contents/images' },
			{ text: 'Tables', link: 'en/contents/tables' },
			{ text: 'Figures', link: 'en/contents/figures' },
		],
		'Forms': [
			{ text: 'Overview', link: 'en/forms/overview_form' },
			{ text: 'Form control', link: 'en/forms/form_control' },
			{ text: 'Select', link: 'en/forms/select' },
			{ text: 'Check & radios', link: 'en/forms/check_radios' },
			{ text: 'Range', link: 'en/forms/range' },
			{ text: 'Input group', link: 'en/forms/input_group' },
			{ text: 'Floating labels', link: 'en/forms/floating_labels' },
			{ text: 'Layout', link: 'en/forms/layout' },
			{ text: 'Validation', link: 'en/forms/validation' },
		],
		'Components': [
			{ text: 'Accordion', link: 'en/components/accordion' },
			{ text: 'Alerts', link: 'en/components/alerts' },
			{ text: 'Badges', link: 'en/components/badges' },
			{ text: 'Breadcrumbs', link: 'en/components/breadcrumbs' },
			{ text: 'Buttons', link: 'en/components/buttons' },
			{ text: 'Button Groups', link: 'en/components/button_groups' },
			{ text: 'Cards', link: 'en/components/cards' },
			{ text: 'Carousel', link: 'en/components/carousels' },
			{ text: 'Collapse', link: 'en/components/collapse' },
			{ text: 'Dropdowns', link: 'en/components/dropdowns' },
			{ text: 'List groups', link: 'en/components/list_groups' },
			{ text: 'Modals', link: 'en/components/modals' },
			{ text: 'Navbar', link: 'en/components/navbar' },
			{ text: 'Nav & Tabs', link: 'en/components/nav_tabs' },
			{ text: 'Offcanvas', link: 'en/components/offcanvas' },
			{ text: 'Pagination', link: 'en/components/pagination' },
			{ text: 'Placeholders', link: 'en/components/placeholders' },
		],
	},
};
