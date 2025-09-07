export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="container mx-auto text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">MyShop</span>. All rights reserved.
      </div>
    </footer>
  );
}
