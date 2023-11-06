import React from "react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle component", () => {
  it("без буквы", () => {
    const circle = renderer.create(<Circle />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("с буквами", () => {
    const circle = renderer.create(<Circle letter="word" />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    >
      word
    </p>
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("с head", () => {
    const circle = renderer.create(<Circle head="1" />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head string"
  >
    1
  </div>
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("с react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Circle />} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  >
    <div
      className="content "
    >
      <div
        className="text text_type_input text_color_input mb-4 absolute head element"
      />
      <div
        className="circle  default"
        data-cy="circle"
      >
        <p
          className="text text_type_circle text_color_input letter"
        />
      </div>
      <p
        className="text text_type_input text_color_input mt-4 absolute index"
      />
      <div
        className="text text_type_input text_color_input mt-4 absolute tail30 element"
      />
    </div>
  </div>
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("с tail", () => {
    const circle = renderer.create(<Circle tail="tail" />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 string"
  >
    tail
  </div>
</div>
`);
  });

  it("с react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  >
    <div
      className="content "
    >
      <div
        className="text text_type_input text_color_input mb-4 absolute head element"
      />
      <div
        className="circle  default"
        data-cy="circle"
      >
        <p
          className="text text_type_circle text_color_input letter"
        />
      </div>
      <p
        className="text text_type_input text_color_input mt-4 absolute index"
      />
      <div
        className="text text_type_input text_color_input mt-4 absolute tail30 element"
      />
    </div>
  </div>
</div>
`);
  });

  it("с index", () => {
    const circle = renderer.create(<Circle index={1} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  >
    1
  </p>
  <div
    className="text text_type_input text_color_input mt-4 absolute tail60 element"
  />
</div>
`);
  });

  it("с пропом isSmall ===  true", () => {
    const circle = renderer.create(<Circle isSmall={true} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle small default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("в состоянии default", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  default"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("в состоянии changing", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  changing"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });

  it("в состоянии modified", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(circle).toMatchSnapshot(`
<div
  className="content "
>
  <div
    className="text text_type_input text_color_input mb-4 absolute head element"
  />
  <div
    className="circle  modified"
    data-cy="circle"
  >
    <p
      className="text text_type_circle text_color_input letter"
    />
  </div>
  <p
    className="text text_type_input text_color_input mt-4 absolute index"
  />
  <div
    className="text text_type_input text_color_input mt-4 absolute tail30 element"
  />
</div>
`);
  });
});
