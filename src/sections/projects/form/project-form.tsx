"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Link, FileText, Lightbulb } from "lucide-react"

export default function ProjectForm() {
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTechnology, setNewTechnology] = useState("")
  const [images, setImages] = useState<string[]>([])

  const addTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology.trim())) {
      setTechnologies([...technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const addImage = () => {
    setImages([...images, ""])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Enlaces
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Contenido
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Recursos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Información General
              </CardTitle>
              <CardDescription>Información básica del proyecto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proyecto *</Label>
                <Input id="name" placeholder="Ingrese el nombre del proyecto" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  placeholder="Describa brevemente el proyecto"
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainImage">Imagen Principal</Label>
                <div className="flex gap-2">
                  <Input id="mainImage" placeholder="URL de la imagen principal" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Suba o proporcione la URL de la imagen principal del proyecto</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Enlaces del Proyecto
              </CardTitle>
              <CardDescription>URLs relacionadas con el proyecto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sourceCodeUrl">URL del Código Fuente</Label>
                <Input id="sourceCodeUrl" placeholder="https://github.com/usuario/proyecto" type="url" />
                <p className="text-sm text-gray-500">Enlace al repositorio de código (GitHub, GitLab, etc.)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deploymentUrl">URL de Despliegue</Label>
                <Input id="deploymentUrl" placeholder="https://miproyecto.com" type="url" />
                <p className="text-sm text-gray-500">Enlace donde está desplegado el proyecto</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Contenido del Proyecto
              </CardTitle>
              <CardDescription>Detalles sobre el problema, solución e impacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem">Problema *</Label>
                <Textarea
                  id="problem"
                  placeholder="Describa el problema que resuelve este proyecto"
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solución *</Label>
                <Textarea
                  id="solution"
                  placeholder="Explique cómo el proyecto soluciona el problema"
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Impacto *</Label>
                <Textarea
                  id="impact"
                  placeholder="Describa el impacto o beneficios del proyecto"
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teachings">Aprendizajes *</Label>
                <Textarea
                  id="teachings"
                  placeholder="¿Qué aprendió durante el desarrollo de este proyecto?"
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tecnologías</CardTitle>
                <CardDescription>Tecnologías utilizadas en el proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar tecnología"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <Button onClick={addTechnology} size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <Button onClick={() => removeTechnology(tech)} className="ml-1 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                {technologies.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No se han agregado tecnologías</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imágenes Adicionales</CardTitle>
                <CardDescription>Galería de imágenes del proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={addImage} variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Imagen
                </Button>

                <div className="space-y-2">
                  {images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`URL de imagen ${index + 1}`}
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                      />
                      <Button
                        onClick={() => removeImage(index)}
                        size="icon"
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {images.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No se han agregado imágenes adicionales</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
        <Button variant="outline">Cancelar</Button>
        <Button>Crear Proyecto</Button>
      </div>
    </div>
  )
}
