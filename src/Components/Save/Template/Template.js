export const templates = {
    java: `
      public {{type}} {{className}} {
          {{#each attributes}}
          {{visibility}} {{type}} {{name}};
          {{/each}}
  
          // Constructor
          public {{className}}({{#each attributes}} {{type}} {{name}}, {{/each}}) {
              {{#each attributes}}
              this.{{name}} = {{name}};
              {{/each}}
          }
  
          {{#each methods}}
          {{visibility}} {{returnType}} {{name}}({{#each parameters}} {{type}} {{name}}, {{/each}}) {
              // Method body
          }
          {{/each}}
      }
    `,
    php: `
      <?php
  
      {{type}} {{className}} {
          {{#each attributes}}
          {{visibility}} {{name}};
          {{/each}}
  
          // Constructor
          public function __construct({{#each attributes}} {{name}}, {{/each}}) {
              {{#each attributes}}
              $this->{{name}} = {{name}};
              {{/each}}
          }
  
          {{#each methods}}
          {{visibility}} function {{name}}({{#each parameters}} {{name}}, {{/each}}) {
              // Method body
          }
          {{/each}}
      }
  
      ?>
    `,
    python: `
      {{type}} {{className}}:
          def __init__(self, {{#each attributes}}{{name}}: {{type}}, {{/each}}):
              {{#each attributes}}self.{{name}} = {{name}}
              {{/each}}
  
          {{#each methods}}
          def {{name}}(self, {{#each parameters}}{{name}}: {{type}}, {{/each}}):
              # Method body
              pass
          {{/each}}
    `
};