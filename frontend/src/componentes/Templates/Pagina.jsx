import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="DeptoFuncionarios" />
                <Menu />
                {
                    props.children
                }
                <Rodape informacoes="João 123, Centro, Bastos/SP.   -   (14) 99878-4400   -    jaumpauloferreira@gmail.com" />
            </Container>
        </>

    );
}