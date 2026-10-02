import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("should render the title and children", () => {
    render(
      <PageContainer title="Minha Conta">
        <p>Conteúdo</p>
      </PageContainer>,
    );

    expect(screen.getByText("Minha Conta")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });
});
