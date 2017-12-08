import expect from 'expect';
import PageLayout from '../../src/components/Decorators/PageLayout';
import LeftAside from "../Components/Pages/Aside/LeftAside"


describe('<PageLayout />', () => {
    it('must have <LeftAside/> component', () => {
        const wrapper = mount(<PageLayout />);
        expect(wrapper.find(LeftAside)).to.have.length(1);
    });
});