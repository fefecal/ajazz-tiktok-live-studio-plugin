# Ajazz Compatibility Enhancements for TikTok LIVE Studio Plugin

[English](#english) | [Português](#português)

A community-maintained compatibility enhancement for a TikTok LIVE Studio plugin distributed through the Ajazz Stream Dock plugin store.

This repository documents and maintains compatibility improvements and quality-of-life enhancements for Ajazz Stream Dock devices while preserving the original plugin behavior whenever practical.

> **Disclaimer**
>
> - This is an **unofficial** community project.
> - It is **not affiliated with, endorsed by, sponsored by, or supported by** TikTok, ByteDance, Elgato, or Ajazz.
> - References to third-party products are solely for compatibility and identification purposes.
> - All trademarks, product names, logos, and other intellectual property remain the property of their respective owners.
> - Based on the available files, the original plugin metadata identifies the software as a TikTok LIVE Studio Stream Deck plugin. The original author and licensing terms of the distributed package could not be independently verified by this repository.

---

<a id="english"></a>

# English

## Overview

This project provides compatibility enhancements for a TikTok LIVE Studio plugin obtained from the Ajazz Stream Dock plugin store.

The objective is to improve the user experience on Ajazz hardware while minimizing changes to the original plugin.

## Features

- Improved compatibility with Ajazz Stream Dock devices.
- Automatic WebSocket reconnection.
- Automatic recovery when TikTok LIVE Studio starts after the plugin.
- Configurable rotary dial volume step.
- Custom **Bleep** action (1000 Hz tone while the key is held).

## Project Files

| File | Description |
|------|-------------|
| `reconnect-fix.js` | Improves WebSocket reconnection behavior. |
| `ajazz-enhancements.js` | Adds Ajazz-specific enhancements and the Bleep action. |
| `ajazz-pi-enhancements.js` | Extends the Property Inspector interface. |

## Installation

1. Download the latest release.
2. Ensure the plugin folder is named `com.tiktok.livestudio.sdPlugin`.
3. Copy it to `%APPDATA%\HotSpot\StreamDock\plugins\`.
4. Restart the Ajazz Stream Dock software.

## Credits

- Original plugin metadata identifies the base software as a TikTok LIVE Studio Stream Deck plugin.
- This repository is based on a package obtained from the Ajazz Stream Dock plugin store.
- Community enhancements and maintenance.

---

<a id="português"></a>

# Português

## Visão geral

Este projeto reúne melhorias de compatibilidade para um plugin do TikTok LIVE Studio obtido na loja de plugins da Ajazz Stream Dock.

O objetivo é melhorar a experiência em dispositivos Ajazz, realizando o mínimo possível de alterações no comportamento do plugin original.

## Funcionalidades

- Melhor compatibilidade com dispositivos Ajazz Stream Dock.
- Reconexão automática do WebSocket.
- Recuperação automática quando o TikTok LIVE Studio é iniciado após o plugin.
- Sensibilidade configurável para os dials.
- Nova ação **Bleep** (tom de 1000 Hz enquanto o botão permanece pressionado).

## Arquivos do projeto

| Arquivo | Descrição |
|---------|-----------|
| `reconnect-fix.js` | Melhora a reconexão automática do WebSocket. |
| `ajazz-enhancements.js` | Recursos adicionais específicos para Ajazz e ação Bleep. |
| `ajazz-pi-enhancements.js` | Expande a interface do Property Inspector. |

## Instalação

1. Baixe a versão mais recente.
2. Verifique se a pasta do plugin possui o nome `com.tiktok.livestudio.sdPlugin`.
3. Copie-a para `%APPDATA%\Ajazz\StreamDock\plugins\`.
4. Reinicie o software Ajazz Stream Dock.

## Créditos

- Os metadados do plugin identificam a base como um plugin do TikTok LIVE Studio para Stream Deck.
- Este repositório foi criado a partir de um pacote obtido na loja de plugins da Ajazz Stream Dock.
- Melhorias e manutenção da comunidade.

## Legal Notice

Este repositório descreve e mantém modificações da comunidade. Nenhuma declaração deste README deve ser interpretada como reivindicação de autoria sobre o software original ou como indicação de afiliação oficial com seus respectivos titulares de direitos.
