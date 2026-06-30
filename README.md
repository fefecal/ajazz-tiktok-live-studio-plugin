# TikTok LIVE Studio for Ajazz Stream Dock

[English](#english) | [Português](#português)

---

<div id="english"></div>

# TikTok LIVE Studio for Ajazz Stream Dock (English)

This repository contains an adapted version of the official TikTok LIVE Studio plugin for Elgato Stream Deck, modified to work seamlessly with Ajazz Stream Dock controllers (AKP150, AKP153, etc.).

## Key Features

* **Auto-Reconnect:** The plugin automatically reestablishes the WebSocket connection with TikTok LIVE Studio if the connection drops or if the Ajazz software is started first.
* **Volume Step Control:** Configurable dial rotation sensitivity. You can adjust the volume step percentage per tick in the Property Inspector to make dial controls smoother.
* **Bleep Action:** A custom action that plays a 1000Hz censor beep using the Web Audio API when the button is held down.

## Installation

1. Clone or download this repository.
2. Make sure the main folder is named `com.tiktok.livestudio.sdPlugin`.
3. Copy the folder to your Ajazz plugins directory (typically `%APPDATA%\Ajazz\StreamDock\plugins\`).
4. Restart the Ajazz software.

## Included Modifications

The core plugin logic remains intact. The compatibility layer and new features are injected through separate files:
* [plugin.html](plugin.html) - Modified to load the enhancement scripts.
* [reconnect-fix.js](reconnect-fix.js) - WebSocket auto-reconnect logic.
* [ajazz-enhancements.js](ajazz-enhancements.js) - Bleep synthesis and dial event handling.
* [ajazz-pi-enhancements.js](ajazz-pi-enhancements.js) - Property Inspector UI updates for volume steps.

## Credits

* **Base Plugin:** TikTok LIVE Studio team / ByteDance Ltd. / Elgato.
* **Ajazz Adaptations:** [Your Name/GitHub].

This is a community-driven, unofficial modification and is not affiliated with TikTok or Elgato.

---

<div id="português"></div>

# TikTok LIVE Studio para Ajazz Stream Dock (Português)

Este repositório contém uma versão adaptada do plugin oficial do TikTok LIVE Studio para Elgato Stream Deck, modificado para funcionar nativamente com os controladores Ajazz Stream Dock (AKP150, AKP153, etc.).

## Principais Funcionalidades

* **Auto-Reconnect:** O plugin reestabelece automaticamente a conexão WebSocket com o TikTok LIVE Studio em caso de queda ou se o software da Ajazz for iniciado antes.
* **Controle de Sensibilidade dos Dials:** Sensibilidade de rotação configurável. É possível ajustar a porcentagem de alteração de volume por "clique" do dial diretamente no Property Inspector.
* **Ação de Bleep (Censura):** Uma nova ação que emite um bipe de censura de 1000Hz (usando Web Audio API) enquanto o botão for mantido pressionado.

## Instalação

1. Baixe os arquivos deste repositório.
2. Certifique-se de que a pasta principal se chama `com.tiktok.livestudio.sdPlugin`.
3. Copie a pasta para o diretório de plugins do Ajazz (geralmente em `%APPDATA%\Ajazz\StreamDock\plugins\`).
4. Reinicie o software da Ajazz.

## Modificações Inclusas

A lógica base do plugin foi mantida intacta. A camada de compatibilidade e as novas funções são injetadas através dos seguintes arquivos:
* [plugin.html](plugin.html) - Modificado para carregar os scripts de melhoria.
* [reconnect-fix.js](reconnect-fix.js) - Lógica de reconexão automática do WebSocket.
* [ajazz-enhancements.js](ajazz-enhancements.js) - Síntese do áudio de bleep e tratamento dos eventos dos dials.
* [ajazz-pi-enhancements.js](ajazz-pi-enhancements.js) - Atualizações na interface do Property Inspector.

## Créditos

* **Plugin Base:** Equipe do TikTok LIVE Studio / ByteDance Ltd. / Elgato.
* **Adaptação para Ajazz:** [fefecal].

Este é um projeto não-oficial mantido pela comunidade, sem nenhum vínculo com o TikTok ou Elgato.
