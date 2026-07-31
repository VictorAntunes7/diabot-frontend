# fix-deploy.ps1
Set-Location dist

# Renomeia qualquer pasta "node_modules" dentro do export para "vendor_modules"
Get-ChildItem -Path . -Recurse -Directory -Filter "node_modules" | ForEach-Object {
    Rename-Item -Path $_.FullName -NewName "vendor_modules"
}

# Corrige as referências a esse caminho dentro dos arquivos JS e HTML
Get-ChildItem -Path . -Recurse -Include *.js,*.html | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace 'node_modules', 'vendor_modules' | Set-Content $_.FullName -NoNewline
}

# Garante o roteamento correto do app (resolve o erro 404 ao navegar/recarregar)
@'
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
'@ | Set-Content vercel.json

Write-Host "Pronto! Pasta dist corrigida e pronta pra deploy."
Set-Location ..
