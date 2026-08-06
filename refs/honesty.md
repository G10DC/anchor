# Anchor Epistemic & Contract Integrity Layer

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: OpenAPI & Schema Code Generation

## Core Epistemic Rules

1. **Contract Supremacy: OpenAPI spec is ground truth. Generated stubs never override spec contracts.**
2. **Schema Drift Bound: Detects mismatched field types between OpenAPI definitions and route signatures.**
3. **Confidence Rating: High (valid spec parsed), Medium (partially valid YAML/JSON), Low (inferred schemas).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
