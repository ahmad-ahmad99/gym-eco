"use client";

import Link from "next/link";
import { AppContainer, AppImage } from "@/components/shared/ui";
import { BrandLogo } from "@/components/layout/brand-logo";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { footerContent } from "@/features/layout/data/footer.data";
import "@/styles/footer.css";

export function Footer() {
  return (
    <footer>
      <section className="section-b-space darken-layout">
        <AppContainer>
          <div className="row footer-theme g-md-5 g-2">
            <div className="col-brand sub-title">
              <div>
                <div className="footer-logo">
                  <BrandLogo invert />
                </div>
                <p>{footerContent.about}</p>
                <ul className="contact-list">
                  <li>
                    <i className="ri-map-pin-line" aria-hidden />
                    {footerContent.address}
                  </li>
                  <li>
                    <i className="ri-phone-line" aria-hidden />
                    {footerContent.phone}
                  </li>
                  <li className="contact-list__email">
                    <i className="ri-mail-line" aria-hidden />
                    {footerContent.email}
                  </li>
                </ul>
              </div>
            </div>

            {footerContent.columns.map((column) => (
              <div key={column.title} className="col-links sub-title">
                <div className="footer-title">
                  <h4>{column.title}</h4>
                </div>
                <div className="footer-content">
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-content">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-newsletter">
              <FooterNewsletter
                title={footerContent.newsletterTitle}
                copy={footerContent.newsletterCopy}
              />
            </div>
          </div>
        </AppContainer>
      </section>

      <div className="sub-footer dark-subfooter">
        <AppContainer>
          <div className="sub-footer__inner">
            <p>{footerContent.copyright}</p>
            <AppImage
              className="sub-footer__payments"
              src="/images/payments/cards.svg"
              alt="Visa PayPal Mastercard Stripe Amex"
              width={220}
              height={22}
              style={{ objectFit: "contain" }}
            />
          </div>
        </AppContainer>
      </div>
    </footer>
  );
}
