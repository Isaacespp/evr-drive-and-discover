import { QueryClient } from "@tanstack/react-query";
import {
  RouterContextProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { Footer, Header } from "@/components/site";
import { INSTAGRAM_URL } from "@/data/cars";

// Header and Footer use <Link>, so they need a router context; the memory history
// keeps the test off the network and off the real browser URL.
function renderWithRouter(ui: ReactElement) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
    context: { queryClient: new QueryClient() },
  });
  return render(<RouterContextProvider router={router}>{ui}</RouterContextProvider>);
}

describe("Instagram integration", () => {
  it("points at the store's own profile", () => {
    expect(INSTAGRAM_URL).toBe("https://www.instagram.com/evrcarmultimarcas/");
  });

  it("offers the Instagram profile in the header", () => {
    renderWithRouter(<Header />);

    const link = screen.getByRole("link", { name: /instagram/i });
    expect(link).toHaveAttribute("href", INSTAGRAM_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows the store's Instagram handle in the footer", () => {
    renderWithRouter(<Footer />);

    const link = screen.getByRole("link", { name: /@evrcarmultimarcas/i });
    expect(link).toHaveAttribute("href", INSTAGRAM_URL);
  });
});
