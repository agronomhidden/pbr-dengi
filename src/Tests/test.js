import React from 'react';
import RightAside from "../Components/Pages/Aside/RightAside"
//
// describe('A suite', function() {
//
//     it('should render without throwing an error', () => {
//         const wrapper = render(
//             <CheckboxWithLabel title="Hello Jest!"/>
//         );
//         const result = <label>Hello Jest!</label>;
//
//         expect(wrapper).is('.foo').toBe(true);
//     });
// });


it('Payments changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<RightAside>
        <p>Привет</p>
    </RightAside>);

    expect(checkbox.find('p').text()).toEqual('Привет');
});