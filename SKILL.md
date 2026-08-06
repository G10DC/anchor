---
name: anchor
description: >-
  Contract-first API spec and boilerplate generator. Parses OpenAPI and schema
  definitions to generate server route stubs, client SDK wrappers, and payload
  validators. Use when bootstrapping a new API from an existing OpenAPI spec or
  generating typed client bindings. Never hand-write route stubs an OpenAPI spec
  already defines; never use for runtime API discovery -- use strata instead.
---

# ⚓ Anchor

Contract-First API Spec & Boilerplate Generator. Anchor enforces a "contract-first" methodology by generating server route handlers, client fetch wrappers, and runtime validation logic directly from API schemas.

## 🎯 Features

1. **Server Stubs**: Generates Express/Node route handlers matching specified endpoints.
2. **Payload Validators**: Creates lightweight schema validation functions for request body and query params.
3. **Client SDK Wrapper**: Generates typed fetch client methods.

## 🚀 Execution Guide

Generate stubs from contract definition:
```bash
node lib/anchor.js --spec "examples/api.json"
```


---

## ⚡ Spark Breakthrough Enhancement

- **Feature**: **Zero-Code Live API Mock Sandbox**
- **Description**: Auto-generates mock server endpoints with dynamic payload generators and local Gemma LLM synthesis.
- **Synergy**: Integrated with `sieve` (data validation) & `keel` (trust boundaries).
- **Framework**: Applied via the `spark` 4-Lens Lateral Ideation Engine.
