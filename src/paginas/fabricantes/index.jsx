import { useEffect, useState } from "react";
import Api from "../../utils/api";
import editIcon from "../../assets/icons/icon-lapis.png";
import iconeExcluir from "../../assets/icons/icon-lixeira.png";
import Loading from "../../componetes/loading";
import { useNavigate } from "react-router-dom";

export default function Fabricantes() {
    const api = new Api();
    const [fabricantes, setFabricantes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fabricantesResponse = await api.get('/fabricantes');
                setFabricantes(fabricantesResponse.fabricantes);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edicao-fabricante/${id}`)
    };

    const handleDelete = (id) => {
        console.log("Delete product with ID:", id);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRedirect = (url) => {
        navigate(url);
    }

    const filteredFabricantes = fabricantes.filter(fabricante => {
        return fabricante.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalFabricantes = filteredFabricantes.length;

    return (
        <>
            {loading && <Loading />}
            <div>
                <h3 className="global-subtitulo">Soluções ({totalFabricantes})</h3>
                <input
                    type="text"
                    placeholder="Procure pelo nome"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="global-input"
                />
                <button className="global-btn global-btn-verde" onClick={e => handleRedirect("/cadastro-fabricante")}>Adicionar fornecedor</button>
                {fabricantes.length > 0 ? (
                    <table className="global-tabela">
                        <thead>
                            <tr>
                                <th className="global-titulo-tabela">Nome</th>
                                <th className="global-titulo-tabela">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFabricantes.map(fabricante => (
                                <tr key={fabricante.id}>
                                    <td className="global-conteudo-tabela">{fabricante.nome}</td>
                                    <td className="global-conteudo-tabela">
                                        <div className="solucoes-container-btn">
                                            <button className="solucoes-editar-btn solucoes-item-btn" onClick={() => handleEdit(fabricante.id)}>
                                                <img src={editIcon} alt="" />
                                            </button>
                                            <button className="solucoes-excluir-btn solucoes-item-btn" onClick={() => handleDelete(fabricante.id)}>
                                                <img src={iconeExcluir} alt="" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Ainda não foram cadastrados fabricantes!</p>
                )}
            </div>
        </>
    );
}
