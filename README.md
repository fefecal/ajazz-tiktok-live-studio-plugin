# TikTok LIVE Studio Plugin para Ajazz Stream Dock / for Ajazz Stream Dock

[English](#english) | [Português](#português)

---

<div id="english"></div>

# TikTok LIVE Studio Plugin for Ajazz Stream Dock (English)

This is a modified version of the official TikTok LIVE Studio plugin for Elgato Stream Deck, adapted to ensure compatibility and improve usability within the Ajazz Stream Dock software (such as AKP150, AKP153, and similar controllers).

These modifications resolve automatic reconnection issues and introduce custom physical control features optimized for Ajazz devices.

## Features and Fixes

### Automatic Reconnection (Auto-Reconnect)
In the original plugin, if the Ajazz software was launched before TikTok LIVE Studio, or if a temporary network drop occurred, the WebSocket connection would fail to reconnect automatically.
* **Solution:** The `reconnect-fix.js` script actively monitors the connection status. If synchronization does not occur within 2.5 seconds or the connection is lost, the plugin automatically attempts to reconnect every 2 seconds, eliminating the need to manually restart the Ajazz software.

### Dial Rotation Sensitivity (Volume Step)
Physical encoders/dials controlling microphone and system volume exhibited inconsistent acceleration and sensitivity.
* **Solution:** A dynamic step control was integrated into the Property Inspector (`ajazz-pi-enhancements.js`). Users can define the exact volume adjustment percentage per rotation tick (e.g., 1%, 5%, etc.) for smoother transitions.

### Censor Tone Action (Bleep)
* **Solution:** Added the `com.tiktok.livestudio.bleep` action. When the configured button is held down, the plugin uses the browser's Web Audio API to synthesize a continuous 1000Hz sine wave directly, stopping the sound immediately upon release.

## Installation

1. Download the contents of this repository.
2. Ensure the main folder is named exactly `com.tiktok.livestudio.sdPlugin`.
3. Copy the folder to the Ajazz Stream Dock plugins directory. The default path on Windows is:
   ```cmd
   %APPDATA%\Ajazz\StreamDock\plugins\
   ```
4. Restart the Ajazz software to load the new actions.

## Modified File Structure

Customizations were implemented in separate files to preserve the integrity of the original compiled code and simplify future updates:
* [plugin.html](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/plugin.html): Entry point loading the compatibility scripts in the header before the main plugin execution.
* [reconnect-fix.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/reconnect-fix.js): Handles WebSocket management and auto-reconnection logic.
* [ajazz-enhancements.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/ajazz-enhancements.js): Intercepts dial rotation events and handles bleep audio synthesis.
* [ajazz-pi-enhancements.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/ajazz-pi-enhancements.js): Extends the Property Inspector to include volume step settings.

## Credits and Disclaimer

* **Base Codebase:** Originally developed by the TikTok LIVE Studio team for Elgato Stream Deck. All intellectual property rights regarding the API and visual assets belong to TikTok / ByteDance Ltd. and Elgato / Corsair.
* **Modifications and Adaptation:** Developed by [Your Name/Github] to resolve compatibility issues in the Ajazz software environment.

> [!NOTE]
> **Disclaimer:** This project is an unofficial modification independently developed by the community. It has no direct affiliation, sponsorship, or support from TikTok, ByteDance, or Elgato.

---

<div id="português"></div>

# TikTok LIVE Studio Plugin para Ajazz Stream Dock (Português)

Esta é uma versão modificada do plugin oficial do TikTok LIVE Studio para Elgato Stream Deck, adaptada para garantir compatibilidade e adicionar melhorias de usabilidade no software dos controladores Ajazz Stream Dock (como AKP150, AKP153 e similares).

As modificações corrigem falhas de reconexão automática e introduzem novos recursos de controle físico para os dispositivos da Ajazz.

## Recursos e Correções

### Correção de Conexão Automática (Auto-Reconnect)
No plugin original, caso o software da Ajazz fosse iniciado antes do TikTok LIVE Studio, ou ocorresse uma queda temporária de rede, a conexão via WebSocket não era reestabelecida automaticamente.
* **Solução:** O script `reconnect-fix.js` monitora o status da conexão ativamente. Caso a sincronização não ocorra em até 2,5 segundos ou a conexão seja interrompida, o plugin realiza tentativas automáticas de reconexão a cada 2 segundos, eliminando a necessidade de reiniciar o software da Ajazz.

### Sensibilidade de Rotação nos Dials (Volume Step)
Os encoders/knobs físicos de volume de microfone e áudio de sistema apresentavam comportamento inconsistente de aceleração e sensibilidade.
* **Solução:** Foi integrado um controle de passo dinâmico no Property Inspector (`ajazz-pi-enhancements.js`). O usuário pode configurar a porcentagem exata de ajuste de volume por clique de rotação (ex: 1%, 5%, etc.), suavizando a transição.

### Ação de Censura (Bleep)
* **Solução:** Adicionada a ação `com.tiktok.livestudio.bleep`. Ao pressionar o botão configurado, o plugin utiliza a API de Áudio do navegador (Web Audio API) para gerar um som senoidal contínuo de 1000Hz diretamente, interrompendo o som imediatamente ao soltar a tecla.

## Instalação

1. Baixe o conteúdo deste repositório.
2. Certifique-se de que a pasta do projeto esteja nomeada exatamente como `com.tiktok.livestudio.sdPlugin`.
3. Copie a pasta para o diretório de plugins do Ajazz Stream Dock. O caminho padrão no Windows é:
   ```cmd
   %APPDATA%\Ajazz\StreamDock\plugins\
   ```
4. Reinicie o software da Ajazz para carregar as novas ações.

## Estrutura dos Arquivos Modificados

As customizações foram desenvolvidas em arquivos separados para preservar a integridade do código original compilado e facilitar futuras atualizações:
* [plugin.html](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/plugin.html): Ponto de entrada que carrega os scripts de compatibilidade no cabeçalho antes do carregamento do plugin.
* [reconnect-fix.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/reconnect-fix.js): Implementa a lógica de tratamento e reconexão automática do WebSocket.
* [ajazz-enhancements.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/ajazz-enhancements.js): Controla a interceptação dos eventos de rotação dos dials e a síntese de áudio do bleep.
* [ajazz-pi-enhancements.js](file:///c:/Users/felip/OneDrive/Área de Trabalho/com.tiktok.livestudio.sdPlugin/ajazz-pi-enhancements.js): Estende o Property Inspector para adicionar os campos de configuração de passos de volume.

## Créditos e Direitos Autorais

* **Código Base:** Desenvolvido originalmente pela equipe do TikTok LIVE Studio para integração com o ecossistema Elgato. Todos os direitos de propriedade intelectual da API e dos assets visuais pertencem à TikTok / ByteDance Ltd. e à Elgato / Corsair.
* **Modificações e Adaptação:** Desenvolvido por [Seu Nome/Github] para resolver problemas de compatibilidade no ecossistema de software da Ajazz.

> [!NOTE]
> **Isenção de Responsabilidade:** Este projeto é uma modificação não oficial desenvolvida de forma independente pela comunidade. Não possui qualquer afiliação direta, patrocínio ou suporte da TikTok, ByteDance ou Elgato.
