import { render, screen } from "@testing-library/react";

import {} from "jest";

import App from "../../../../App";

describe("App", () => {
    it("should render main page", async () => {
        render(<App />);
        
        const text = (await screen.findByText('register')).textContent ?? null;
        expect(text).toBeDefined();
        expect(text).not.toBe(null)

      });
});
