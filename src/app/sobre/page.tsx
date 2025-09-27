'use client'

import Card from '@/components/ui/Card';

export default function Sobre() {
  const technologies = [
    { name: 'Next.js 15', description: 'Framework React com App Router' },
    { name: 'TypeScript', description: 'JavaScript com tipagem estática' },
    { name: 'Tailwind CSS', description: 'Framework CSS utilitário' },
    { name: 'VS Code', description: 'Editor com extensões otimizadas' }
  ];

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Sobre Este Projeto
        </h1>
        <p className="text-gray-600 text-lg">
          Estrutura moderna para desenvolvimento web
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Descrição do Projeto" variant="info">
          <p className="text-gray-700 leading-relaxed">
            Esta aplicação foi desenvolvida como exemplo de boas práticas 
            para projetos Next.js modernos. Inclui estrutura organizada, 
            componentes reutilizáveis, tipagem TypeScript e design responsivo.
          </p>
        </Card>

        <Card title="Arquitetura" variant="highlighted">
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>App Router:</strong> Roteamento moderno</li>
            <li>✅ <strong>Client Components:</strong> Interatividade</li>
            <li>✅ <strong>Custom Hooks:</strong> Lógica reutilizável</li>
            <li>✅ <strong>TypeScript:</strong> Tipagem segura</li>
          </ul>
        </Card>
      </div>

      <Card title="Tecnologias Utilizadas">
        <div className="grid md:grid-cols-2 gap-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-gray-800">{tech.name}</h4>
              <p className="text-gray-600 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
