---
name: anchor
status: implemented
description: >-
  Contract-first API spec and boilerplate generator. Parses OpenAPI and schema
  definitions to generate server route stubs, client SDK wrappers, and payload
  validators. Use when bootstrapping a new API from an existing OpenAPI spec or
  generating typed client bindings. Never hand-write route stubs an OpenAPI spec
  already defines; never use for runtime API discovery -- use strata instead.
---

# Anchor

Contract-First API Spec & Boilerplate Generator. Anchor enforces a "contract-first" methodology by generating server route handlers, client fetch wrappers, and runtime validation logic directly from API schemas.

## Features

1. **Server Stubs**: Generates Express/Node route handlers matching specified endpoints.
2. **Payload Validators**: Creates lightweight schema validation functions for request body and query params.
3. **Client SDK Wrapper**: Generates typed fetch client methods.

## Execution Guide

Generate stubs from contract definition:
```bash
node lib/anchor.js --spec "examples/api.json"
```

**Honest scope**: despite "Parses OpenAPI," it does not parse or validate an OpenAPI document —
it reads `spec.endpoints` as a plain array of `{ method, path, summary, requiredFields, name }`
objects directly. There is no `$ref` resolution, no schema-type generation, and no OpenAPI
version handling. You (or a real OpenAPI parser upstream) must already have flattened the spec
into that endpoint-list shape before calling this.

## When to use

- You already have (or can easily produce) a flat list of `{ method, path, ... }` endpoint
  objects and want boilerplate Express route stubs and a matching fetch-based client generated
  from them, without hand-writing that repetitive code yourself.

## When NOT to use

- **You have a real OpenAPI/Swagger document with `$ref`s, and need it resolved and validated,
  not just its endpoint list echoed into stub code** — this does not parse OpenAPI; flatten it
  yourself first, or use a real OpenAPI toolchain.
- **You need runtime API discovery against a live service, not codegen from a static spec** →
  use `strata` instead.
