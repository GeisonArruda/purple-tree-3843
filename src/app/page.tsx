
'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image' // Import Image component for logo
import { useState } from 'react' // Import useState for mobile menu
import { Menu, X } from 'lucide-react' // Icons for mobile menu

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: Fetch actual car brands and years
  const carBrands = ['Chevrolet', 'Fiat', 'Ford', 'Hyundai', 'Renault', 'Toyota', 'Volkswagen', 'Outra']
  const currentYear = new Date().getFullYear()
  const carYears = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  const handleStartQuote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const brand = formData.get('brand');
    const model = formData.get('model');
    const year = formData.get('year');
    console.log('Quick Quote Data:', { brand, model, year });
    // Navigate to quote page with query parameters
    window.location.href = `/cota?brand=${encodeURIComponent(brand as string)}&model=${encodeURIComponent(model as string)}&year=${encodeURIComponent(year as string)}`;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <header className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* TODO: Replace text with actual Logo component if available */}
          <div className="text-xl font-bold text-white">
             {/* <Image src="/logo-arruda.png" alt="Arruda Corretora Logo" width={150} height={40} /> Placeholder */}
             Arruda Corretora
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Button variant="ghost" className="text-white hover:bg-gray-700">Home</Button>
            <Button variant="ghost" className="text-white hover:bg-gray-700">Sobre Nós</Button>
            <Button variant="ghost" className="text-white hover:bg-gray-700">Serviços</Button>
            <Button asChild variant="link" className="text-yellow-400 font-semibold hover:text-yellow-300">
              <a href="/cota">Cotação Online</a>
            </Button>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden container mx-auto mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="text-white justify-start hover:bg-gray-700">Home</Button>
              <Button variant="ghost" className="text-white justify-start hover:bg-gray-700">Sobre Nós</Button>
              <Button variant="ghost" className="text-white justify-start hover:bg-gray-700">Serviços</Button>
              <Button asChild variant="link" className="text-yellow-400 font-semibold justify-start hover:text-yellow-300">
                <a href="/cota">Cotação Online</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Seguro Auto Rápido, Fácil e Confiável</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Compare preços em 14 seguradoras parceiras e encontre a melhor proteção para seu veículo. Simule online em poucos minutos!
        </p>
        <Button asChild size="lg" className="mb-12 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"> 
          {/* TODO: Adjust color based on logo */}
          <a href="/cota">Simule seu Seguro Auto Agora</a>
        </Button>

        {/* Quick Quote Form */}
        <Card className="max-w-2xl mx-auto text-left shadow-xl border border-gray-200 rounded-lg">
          <CardHeader className="bg-gray-50 rounded-t-lg border-b border-gray-200">
            <CardTitle className="text-gray-800">Comece sua cotação aqui!</CardTitle>
            <CardDescription>Preencha os dados básicos do seu veículo para ver as opções.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleStartQuote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="brand" className="font-medium text-gray-700">Marca</Label>
                  <Select name="brand" required>
                    <SelectTrigger id="brand" className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="Selecione a Marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {carBrands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model" className="font-medium text-gray-700">Modelo</Label>
                  <Input id="model" name="model" placeholder="Ex: Onix, Strada" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
                </div>
                <div>
                  <Label htmlFor="year" className="font-medium text-gray-700">Ano</Label>
                  <Select name="year" required>
                    <SelectTrigger id="year" className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="Selecione o Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {carYears.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2.5 rounded-md shadow transition duration-300"> 
                {/* TODO: Adjust color */}
                Ver Opções de Seguro
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Trust Elements Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10 text-gray-800">Trabalhamos com as Melhores Seguradoras</h2>
          {/* Partner Logos Placeholder */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 mb-16 opacity-70">
            {/* TODO: Replace spans with actual Image components for logos */}
            <span className="text-gray-500 font-medium">[Logo Porto Seguro]</span>
            <span className="text-gray-500 font-medium">[Logo Azul Seguros]</span>
            <span className="text-gray-500 font-medium">[Logo Tokio Marine]</span>
            <span className="text-gray-500 font-medium">[Logo Bradesco Seguros]</span>
            <span className="text-gray-500 font-medium">[Logo HDI Seguros]</span>
            <span className="text-gray-500 font-medium">[Logo Sompo Seguros]</span>
            <span className="text-gray-500 font-medium">[Logo Mapfre]</span>
            <span className="text-gray-500 font-medium">[+ 7 outras]</span>
          </div>
          
          <h2 className="text-3xl font-semibold mb-10 text-gray-800">O que nossos clientes dizem</h2>
          {/* Testimonials Placeholder */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* TODO: Replace with actual testimonial components */}
            <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-700 text-left">
              <p>"Excelente atendimento e consegui o melhor preço para o seguro do meu carro! Processo rápido e fácil. Recomendo a Arruda Corretora!"</p>
              <footer className="mt-2 text-sm font-semibold text-gray-600">- Cliente Satisfeito A.</footer>
            </blockquote>
             <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-700 text-left">
              <p>"Fui muito bem atendido, tiraram todas as minhas dúvidas e a cotação online foi super prática. Economizei tempo e dinheiro."</p>
              <footer className="mt-2 text-sm font-semibold text-gray-600">- Cliente Satisfeito B.</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 p-8 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-2">Arruda Corretora</h3>
            {/* TODO: Add address and CNPJ */}
            <p>Seu parceiro de confiança em seguros.</p>
            <p>Endereço: [Seu Endereço Completo]</p>
            <p>CNPJ: [Seu CNPJ]</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Contato</h3>
            {/* TODO: Add actual contact info */}
            <p>Telefone: [Seu Telefone]</p>
            <p>WhatsApp: [Seu WhatsApp]</p>
            <p>Email: [Seu Email]</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Redes Sociais</h3>
            {/* TODO: Add actual social media links */}
            <a href="#" className="hover:text-white mr-4">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
        <div className="container mx-auto text-center text-xs mt-8 border-t border-gray-700 pt-4">
          © {currentYear} Arruda Corretora de Seguros. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  )
}

