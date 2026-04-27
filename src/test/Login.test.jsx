import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Login from "../pages/Login"
import { AuthProvider } from "../context/AuthContext"
import { MemoryRouter } from "react-router-dom"

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  )
}

describe("Login Page", () => {
    
  it("should render login form", () => {
    renderWithProviders(<Login />)

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  it("should type in inputs", () => {
    renderWithProviders(<Login />)

    const email = screen.getByPlaceholderText(/email/i)
    const password = screen.getByPlaceholderText(/senha/i)

    fireEvent.change(email, { target: { value: "test@test.com" } })
    fireEvent.change(password, { target: { value: "123456" } })

    expect(email.value).toBe("test@test.com")
    expect(password.value).toBe("123456")
  })
})