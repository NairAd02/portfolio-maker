import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Folder,
  FileText,
  Briefcase,
  Award,
  Mail,
  ImageIcon,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingContainer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="text-xl font-bold text-slate-800">
              PortfolioMaker
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#caracteristicas"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Características
            </Link>
            <Link
              href="#precios"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Precios
            </Link>
            <Link
              href="#faq"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              FAQ
            </Link>
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Empieza Gratis
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  ✨ Nuevo: Plantillas AI-powered
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Crea tu portafolio profesional en{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    minutos
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  PortfolioMaker te ayuda a mostrar tus proyectos, experiencia,
                  certificaciones y más de forma intuitiva. Sin código, sin
                  complicaciones.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                >
                  Empieza Gratis
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent"
                >
                  Ver Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sin tarjeta de crédito</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Setup en 5 minutos</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Portfolio example on laptop"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="caracteristicas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Todo lo que necesitas para destacar
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Herramientas profesionales para crear un portafolio que realmente
              represente tu talento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Añade tus proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Muestra miniaturas de proyectos desarrollados o en los que has
                  colaborado con descripciones detalladas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Publicaciones y blogs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Espacio dedicado para tus artículos, entradas de blog, papers
                  y contenido técnico.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Experiencia profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Ingresa tu trayectoria como informático de forma intuitiva y
                  rápida con timeline interactivo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Lista y muestra logos de tus credenciales, cursos completados
                  y certificaciones profesionales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Formulario simple con email, LinkedIn y otros enlaces
                  profesionales para que te contacten fácilmente.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multimedia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Sube imágenes, vídeos y otros contenidos para enriquecer tu
                  portafolio y hacerlo más atractivo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demostración */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Elige entre múltiples diseños personalizables
            </h2>
            <p className="text-xl text-slate-600">
              Plantillas profesionales diseñadas para diferentes industrias y
              estilos
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Template 1"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900">Minimalista</h3>
                  <p className="text-sm text-slate-600">
                    Diseño limpio y elegante
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Template 2"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900">Creativo</h3>
                  <p className="text-sm text-slate-600">
                    Colores vibrantes y dinámico
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Template 3"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900">Corporativo</h3>
                  <p className="text-sm text-slate-600">
                    Profesional y confiable
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-slate-600">
              Miles de profesionales ya confían en PortfolioMaker
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  PortfolioMaker me ayudó a conseguir mi trabajo actual. La
                  facilidad para mostrar mis proyectos de forma profesional fue
                  clave.
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">
                      María González
                    </p>
                    <p className="text-sm text-slate-600">Frontend Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  La mejor inversión que he hecho. Mi portafolio se ve
                  increíblemente profesional y he recibido más ofertas de
                  trabajo.
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Carlos Rodríguez
                    </p>
                    <p className="text-sm text-slate-600">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  Súper fácil de usar y los resultados son impresionantes. Mis
                  clientes quedan fascinados con la presentación de mis
                  proyectos.
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">Ana López</p>
                    <p className="text-sm text-slate-600">UX/UI Designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Planes y Precios */}
      <section
        id="precios"
        className="py-20 bg-gradient-to-r from-slate-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Planes para cada necesidad
            </h2>
            <p className="text-xl text-slate-600">
              Comienza gratis y escala según tus necesidades profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <div className="text-4xl font-bold text-slate-900">$0</div>
                <p className="text-slate-600">Para empezar</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>1 portafolio público</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>5 proyectos máximo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Plantillas básicas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Subdominio PortfolioMaker</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Comenzar Gratis
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Más Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Profesional</CardTitle>
                <div className="text-4xl font-bold text-slate-900">$9</div>
                <p className="text-slate-600">por mes</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>3 portafolios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Proyectos ilimitados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Todas las plantillas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Dominio personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Analytics básicos</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Elegir Profesional
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold text-slate-900">$19</div>
                <p className="text-slate-600">por mes</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Portafolios ilimitados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Todo de Profesional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Plantillas premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Analytics avanzados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Soporte prioritario</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Elegir Premium
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-slate-600">
              Resolvemos tus dudas más comunes
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Necesito conocimientos técnicos para usar PortfolioMaker?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  No, PortfolioMaker está diseñado para ser completamente
                  intuitivo. No necesitas saber programación ni diseño. Nuestro
                  editor visual te permite crear un portafolio profesional
                  simplemente arrastrando y soltando elementos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Puedo usar mi propio dominio?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Sí, con los planes Profesional y Premium puedes conectar tu
                  propio dominio personalizado. Te guiamos paso a paso en el
                  proceso de configuración para que sea súper sencillo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Mis datos están seguros?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Absolutamente. Utilizamos encriptación SSL de grado bancario y
                  cumplimos con todas las regulaciones de privacidad. Tus datos
                  nunca se comparten con terceros y tienes control total sobre
                  tu información.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Puedo cambiar de plan en cualquier momento?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Sí, puedes actualizar o degradar tu plan cuando quieras. Los
                  cambios se aplican inmediatamente y solo pagas la diferencia
                  prorrateada. No hay penalizaciones por cambiar de plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  ¿Ofrecen soporte técnico?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Sí, ofrecemos soporte por email para todos los usuarios. Los
                  usuarios Premium tienen acceso a soporte prioritario con
                  respuesta en menos de 24 horas. También tenemos una base de
                  conocimientos completa y tutoriales en video.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              ¿Listo para crear tu portafolio profesional?
            </h2>
            <p className="text-xl text-blue-100">
              Únete a miles de profesionales que ya destacan con PortfolioMaker
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Empieza Gratis Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Ver Ejemplos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <span className="text-xl font-bold">PortfolioMaker</span>
              </div>
              <p className="text-slate-400">
                La plataforma más fácil para crear portafolios profesionales que
                realmente destacan.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Plantillas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ejemplos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tutoriales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Estado del Servicio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} PortfolioMaker. Todos los derechos
              reservados.
            </p>
            <p className="text-slate-400 text-sm">
              Hecho con ❤️ para profesionales que quieren destacar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
