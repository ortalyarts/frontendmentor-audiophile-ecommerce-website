import HeaderInnerPage from "@/components/headerInnerPage";

export default function NotFound() {
    return (
      <>
        <HeaderInnerPage />
        <main className="not-found">
          <h1>Not found</h1>
          <p>Unfortunately, we could not find the requested page or resource.</p>
        </main>
      </>
      
    );
  }