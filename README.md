# Maxwell Tsai portfolio

Personal portfolio built with Next.js, Tailwind CSS and Framer Motion, based on the
[Engineering Student Portfolio](https://github.com/niladri-1/Engineering_Student_Portfolio) template by niladri-1.
Hosted on GitHub Pages.

## Where things are

- `lib/constants.ts`: name, intro, links, resumes, experience, education and skills
- `lib/projects.ts`: every project and its page content
- `public/images`, `public/videos`, `public/files`: images, videos, resumes and the EC417 report
- `app/`: pages (home, about, experience, projects, project pages, contact)

To add a project, add an entry to `lib/projects.ts`. Its page appears at `/projects/<slug>/`.

## Run locally

    npm install
    npm run dev        # http://localhost:3000

## Publish

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
The repository must be named `<username>.github.io`, and Settings > Pages > Source must be set to **GitHub Actions**.

Keep images under about 500 KB and videos under 100 MB (GitHub's file limit).
