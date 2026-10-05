import Link from "next/link";
import { AppContainer } from "@/components/shared/ui";
import type { BreadcrumbItem } from "@/features/product/models/product.model";

type PageTitleBannerProps = {
  title: string;
  breadcrumbs: BreadcrumbItem[];
};

export function PageTitleBanner({ title, breadcrumbs }: PageTitleBannerProps) {
  return (
    <section className="breadcrumb-section">
      <AppContainer>
        <h2>{title}</h2>
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbs.map((item, index) => {
              const isActive = index === breadcrumbs.length - 1;

              return (
                <li
                  key={`${item.label}-${index}`}
                  className={isActive ? "breadcrumb-item active" : "breadcrumb-item"}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.href && !isActive ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </AppContainer>
    </section>
  );
}
