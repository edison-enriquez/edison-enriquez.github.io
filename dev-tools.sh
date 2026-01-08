#!/bin/bash

# Script de utilidad para el proyecto Edison Enriquez Portfolio

echo "🚀 Edison Enriquez Portfolio - Menú de Utilidades"
echo "================================================"
echo ""
echo "1) Iniciar servidor de desarrollo"
echo "2) Build para producción"
echo "3) Preview del build"
echo "4) Ver estructura del proyecto"
echo "5) Verificar errores"
echo "6) Salir"
echo ""
read -p "Selecciona una opción (1-6): " option

case $option in
  1)
    echo "🔥 Iniciando servidor de desarrollo..."
    npm run dev
    ;;
  2)
    echo "📦 Construyendo para producción..."
    npm run build
    echo "✅ Build completado en ./dist"
    ;;
  3)
    echo "👀 Previsualizando build de producción..."
    npm run preview
    ;;
  4)
    echo "📁 Estructura del proyecto:"
    tree -L 3 -I 'node_modules|dist|.git' -a
    ;;
  5)
    echo "🔍 Verificando errores..."
    npm run lint
    ;;
  6)
    echo "👋 ¡Hasta luego!"
    exit 0
    ;;
  *)
    echo "❌ Opción no válida"
    exit 1
    ;;
esac
