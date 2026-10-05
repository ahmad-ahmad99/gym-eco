"use client";

import { useIsClient } from "@/core/hooks/use-is-client";

const SOCIAL_LINKS = [
  { href: "https://facebook.com/", icon: "ri-facebook-fill", label: "Facebook" },
  { href: "https://twitter.com/", icon: "ri-twitter-fill", label: "Twitter" },
  { href: "https://instagram.com/", icon: "ri-instagram-fill", label: "Instagram" },
  { href: "https://pinterest.com/", icon: "ri-pinterest-fill", label: "Pinterest" },
] as const;

type FooterNewsletterProps = {
  title: string;
  copy: string;
};

function NewsletterFormPlaceholder() {
  return (
    <div className="form-inline newsletter-form-placeholder" aria-hidden="true">
      <div className="form-group me-sm-3 mb-2">
        <div className="form-control newsletter-form-placeholder__field" />
      </div>
      <div className="btn btn-solid mb-2 newsletter-form-placeholder__button">Subscribe</div>
    </div>
  );
}

function NewsletterForm() {
  return (
    <form
      className="form-inline"
      autoComplete="off"
      data-lpignore="true"
      data-1p-ignore="true"
      data-bwignore="true"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="form-group me-sm-3 mb-2">
        <input
          type="email"
          name="newsletter-email"
          className="form-control"
          placeholder="Enter Email Address"
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          data-bwignore="true"
          aria-label="Email address"
        />
      </div>
      <button type="submit" className="btn btn-solid mb-2">
        Subscribe
      </button>
    </form>
  );
}

export function FooterNewsletter({ title, copy }: FooterNewsletterProps) {
  const isClient = useIsClient();

  return (
    <div className="sub-title footer-style-1">
      <div className="footer-title">
        <h4>{title}</h4>
      </div>
      <div className="footer-content">
        <p className="mb-cls-content">{copy}</p>
        {isClient ? <NewsletterForm /> : <NewsletterFormPlaceholder />}
        <div className="footer-social">
          <ul>
            {SOCIAL_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <i className={item.icon} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
